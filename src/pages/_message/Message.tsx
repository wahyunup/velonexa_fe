import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import {
  createNewChat,
  getChat,
  getChatCurrentUser,
} from "../../services/ChatApi";
import type {userChatListProps, UserProps } from "../type";
import UserChatList from "../../components/partials/UserChatList";
import { getAllUser, getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import InputChat from "../../components/partials/InputChat";
import BodyChat from "../../components/partials/BodyChat";
import ChatListSkeleton from "../../skeleton/ChatList/ChatListSkeleton";
import ListUser from "../../components/partials/ListUser";

const Message = () => {
  const [userChatList, setUserChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState<userChatListProps | null>(
    null
  );

  const [bodyChat, setBodyChat] = useState([]);
  const [user, setUser] = useState<UserProps | undefined>();
  const [chatValue, setChatValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenUserList, setIsOpenUserList] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken();
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
    const fetchBodyChat = async () => {
      if (!selectedChat) return;

      const res = await getChatCurrentUser(selectedChat.id);
      setBodyChat(res.chat);
    };
    fetchBodyChat();
  }, [selectedChat]);

  useEffect(() => {
    setIsLoading(true);
    const fetchChats = async () => {
      const res = await getChat();
      setUserChatList(res.users);
      setIsLoading(false);
    };
    fetchChats();
  }, []);

  const handleShowDetailChat = (chat: userChatListProps) => {
    setSelectedChat(chat);
    setChatValue("");
  };

  const handleSendChat = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedChat) return;

    const res = await createNewChat(chatValue, selectedChat.id);
    setChatValue("");

    return res;
  };


  return (
    <AppLayout classname="flex">
      <div className="flex w-full bg-red-200">
        <div className="bg-white p-10 flex flex-col gap-[29px] border-r-1 border-[#F4F4F4] w-[50%]">
          <p className="text-[27px] font-medium ">Message</p>
          <div className="flex flex-col gap-[7px] overflow-y-scroll thin-scrollbar h-[790px]">
            {isLoading ? (
              Array.from({ length: 5 }).map(() => <ChatListSkeleton />)
            ) : userChatList.length > 0 ? (
              userChatList.map((chatList: userChatListProps) => (
                <UserChatList
                  id={chatList.id}
                  onclick={() => handleShowDetailChat(chatList)}
                  image={chatList.image}
                  lastMessage={chatList.lastMessage}
                  username={chatList.username}
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
                Pick someone from the list on the left and start the
                conversation.
              </p>
            </div>
          ) : (
            <>
              {/* header chatt */}
              <div className="flex gap-[10px] items-center bg-white border-b-1 border-[#F4F4F4] py-[15px] px-[20px]">
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
              <BodyChat bodyChat={bodyChat} user={user} />

              {/* input chat */}
              <InputChat
                handleSendChat={handleSendChat}
                chatValue={chatValue}
                setChatValue={setChatValue}
                user={user}
              />
            </>
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
