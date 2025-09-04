import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import {
  createNewChat,
  getChat,
  getChatCurrentUser,
} from "../../services/ChatApi";
import type { userChatListProps, UserProps } from "../type";
import UserChatList from "../../components/partials/UserChatList";
import { getAllUser, getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import InputChat from "../../components/partials/InputChat";
import BodyChat from "../../components/partials/BodyChat";
import ChatListSkeleton from "../../skeleton/ChatList/ChatListSkeleton";
import ListUser from "../../components/partials/ListUser";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const [userChatList, setUserChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState<userChatListProps | null>(
    null
  );

  const [bodyChat, setBodyChat] = useState([]);
  const [user, setUser] = useState<UserProps | undefined>();
  const [chatValue, setChatValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBody, setIsLoadingBody] = useState(false);
  const [isOpenUserList, setIsOpenUserList] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken();
      if (!res) {
        navigate("auth/login");
        setUser({ id: 0 });
      }
      const decode = jwtDecode<UserProps>(res);
      setUser(decode);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAllUser = async () => {
      const res = await getAllUser();

      setAllUser(res);
    };
    fetchAllUser();
  }, []);

 useEffect(() => {
  if (!selectedChat) return;

  
  // fetch pertama sekali (untuk tampilan awal)
  const fetchFirst = async () => {
    setIsLoadingBody(true);
    try {
      const res = await getChatCurrentUser(selectedChat.id);
      setBodyChat(res.chat);
      setIsLoadingBody(false); // loading selesai setelah fetch pertama
    } catch (err) {
      console.error(err);
      setIsLoadingBody(false);
    }
  };

  fetchFirst();

  // polling data tiap 1 detik TANPA set loading
  const interval = setInterval(async () => {
    try {
      const res = await getChatCurrentUser(selectedChat.id);
      setBodyChat(res.chat);
    } catch (err) {
      console.error(err);
    }
  }, 1000);

  return () => clearInterval(interval);
}, [selectedChat]);



  useEffect(() => {
    setIsLoading(true);
    const fetchChats = async () => {
      const res = await getChat();
      setUserChatList(res.users);
      setIsLoading(false);
    };

    fetchChats();

    const interval = setInterval( async() => {
      const res = await getChat();
      setUserChatList(res.users);
    },1000)

    return () => clearInterval(interval)
  }, []);

  const handleShowDetailChat = (chat: userChatListProps) => {
    setSelectedChat(chat);
    setChatValue("");
  };

  const handleSendChat = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedChat) return;
    setIsLoadingSendComment(true)

    const res = await createNewChat(chatValue, selectedChat.id);
    setChatValue("");
setIsLoadingSendComment(false)
    return res;
  };

  return (
    <AppLayout classname="flex">
      <div className="flex w-full ">
        <div className="bg-white h-svh p-10 flex flex-col gap-[29px] border-r-1 border-[#F4F4F4] w-[50%]">
          <p className="text-[27px] font-medium ">Message</p>
          <div className="flex flex-col gap-[7px] overflow-y-scroll thin-scrollbar  h-full">
            {isLoading ? (
              Array.from({ length: 5 }).map(() => <ChatListSkeleton />)
            ) : userChatList.length > 0 ? (
              userChatList.map((chatList: userChatListProps) => (
                <UserChatList
                  id={chatList?.id}
                  onclick={() => handleShowDetailChat(chatList)}
                  image={chatList?.image}
                  lastMessage={chatList?.lastMessage}
                  username={chatList?.username}
                />
              ))
            ) : (
              <>
                <div className=" h-full flex justify-center items-center flex-col gap-5">
                  <h1>Ready to chat?</h1>
                  <button
                    onClick={() => setIsOpenUserList(true)}
                    className="bg-[#3971FF] text-white py-2 px-4 rounded-lg cursor-pointer">
                    New Conversation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white w-full ">
          {selectedChat === null ? (
            <div className="flex h-full justify-center items-center">
              <p className="text-center">
                Pick someone from the list on the left <br /> and start the
                conversation.
              </p>
            </div>
          ) : (
            <div className="h-screen flex flex-col justify-between bg-red">
              <div
                className="h-full overflow-y-scroll thin-scrollbar bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/background/background-chat.jpg')",
                  backgroundSize: "500px",
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  backgroundBlendMode: "overlay",
                }}>
                {/* header chatt */}
                <div className="flex sticky top-0 z-10  gap-[10px] items-center bg-white border-b-1 border-[#F4F4F4] py-[15px] px-[20px] ">
                  <div className="w-[54px] h-[54px] overflow-hidden rounded-full">
                    <img
                      className="object-cover w-full h-full"
                      src={`${selectedChat?.image}`}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{selectedChat?.username}</span>
                    <span className="text-xs text-[#00B11C]">online</span>
                  </div>
                </div>
                {/* body chat */}
                <BodyChat
                  isLoading={isLoadingBody}
                  bodyChat={bodyChat}
                  user={user}
                />
              </div>
              {/* input chat */}
              <InputChat
                handleSendChat={handleSendChat}
                chatValue={chatValue}
                setChatValue={setChatValue}
                isLoadingSendComment={isLoadingSendComment}
                user={user}
              />
            </div>
          )}
        </div>
      </div>

      {isOpenUserList && (
        <ListUser
          handleFalse={() => setIsOpenUserList(false)}
          allUser={allUser}
        />
      )}
    </AppLayout>
  );
};

export default Message;
