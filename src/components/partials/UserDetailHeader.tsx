import { useEffect, useState } from "react";
import type { UserDetailHeaderProps } from "../ui";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/userApi";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { MdVerified } from "react-icons/md";
import { Follow, unfollow } from "../../services/followApi";
import { createNotification } from "../../services/NotifApi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiUserSettingsLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import NewChatModal from "../modal/NewChat";
import { createNewChat } from "../../services/ChatApi";
import { toast } from "react-toastify";

const UserDetailHeader = ({
  getStatus,
  userId,
  username,
  displayname,
  postCount,
  followerCount,
  followingCount,
  bio,
  email,
  image,
  isFollow,
  setIsFollow,
  fetchFollowing,
}: UserDetailHeaderProps) => {
  const route = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    email: "",
  });
  const [hover, setHover] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [chatValue, setChatValue] = useState("")

  const handleIsFollow = async () => {
    try {
      const res = await Follow(userId);
      setIsFollow(res.follow.isFollow);
      createNotification({
        target_id: userId,
        type: "follow",
        feed_id: null,
      });

      fetchFollowing?.();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    const res = await unfollow(userId);
    setIsFollow(res.unfollow.isFollow);
    getStatus();
    fetchFollowing?.();
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getToken();
      const decode = jwtDecode(user) as JwtPayload & { email: string };
      setCurrentUser({ email: decode.email });
    };
    fetchData();
  }, []);

    const handleSendChat = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const res = await createNewChat(chatValue, userId);
      setChatValue("");

      
      toast.success("send message success")
      setIsOpen(false)
      return res;
    };

  let actionButton;

  if (currentUser.email !== email) {
    actionButton = isFollow ? (
      <div className="flex gap-3 items-center">
        <button
          onClick={handleUnfollow}
          className="cursor-pointer h-fit text-[14px] font-medium p-[10px] text-[#3971FF] hover:outline  hover:outline-[#3971FF] outline outline-[#d0deff] bg-[#dde7ff] rounded-xl transition-all duration-300">
          unfollow
        </button>
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setHover("message")}
          onMouseLeave={() => setHover("")}
          className="cursor-pointer h-fit p-[10px] text-[#3971FF] outline hover:outline-[#3971FF] bg-[#dde7ff] rounded-xl flex items-center gap-1 text-[14px] transition-all duration-300 outline-[#d0deff]">
          <IoChatbubbleEllipsesOutline size={25}/>
            <AnimatePresence mode="wait">
            {hover === "message" && (
              <motion.span
              key={"message"}
              initial={{x:-10 , opacity: 0}}
              animate={{x: 0, opacity: 1}}
              exit={{x: -10, opacity: 0}}
              transition={{duration: 0.2, ease: "easeInOut"}}
              >

                {hover}       
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    ) : (
      <button
        onClick={handleIsFollow}
        className="cursor-pointer h-fit text-[14px] font-medium  p-[10px] text-white bg-[#3971FF] rounded-xl transition-all duration-300">
        follow
      </button>
    );
  } else {
    actionButton = (
      <button
        onClick={() => route("/setting/profile")}
        onMouseEnter={() => setHover("Edit profile")}
        onMouseLeave={() => setHover("")}
        className="cursor-pointer text-[14px] h-fit font-medium p-[10px] text-[#3971FF] hover:outline hover:outline-[#3971FF] bg-[#ebf1ff] rounded-xl flex items-center gap-2">
          <RiUserSettingsLine size={25}/>
          <AnimatePresence mode="wait">

         {hover === "Edit profile" && (
           <motion.span
           key={"edit"}
           initial={{x:-10 , opacity: 0}}
           animate={{x: 0, opacity: 1}}
           exit={{x: -10, opacity: 0}}
           transition={{duration: 0.2, ease: "easeInOut"}}
           >

                {hover}       
              </motion.span>
         )}
         </AnimatePresence>
      </button>
    );
  }

  return (
    <>
    <div className="sticky top-0 bg-[#FCFCFC]">
      <div className="flex gap-[37px] pt-20 px-10 ">
        <div className="flex flex-col items-center gap-[18px]">
          <div className="w-[131px] h-[131px] rounded-full overflow-hidden">
            <img className="object-cover w-full h-full" src={image} alt="" />
          </div>
       
        </div>

        <div className="flex gap-[20px] flex-col ">
          <div className="flex gap-4 items-center">
          <div className="flex gap-[2px] flex-col">
            <h1 className="text-[24px] font-medium flex items-center gap-1">
              {displayname}
              <MdVerified className=" right-0 bottom-10" color="#3971FF" />
            </h1>
            <span className="text-[16px] text-[#A5A5A5]">@{username}</span>
          </div>
             {actionButton}
          </div>
          <div className="flex gap-[50px]">
            <span className="text-[19px]">{postCount} post</span>
            <span className="text-[19px]">{followerCount} followers</span>
            <span className="text-[19px]">{followingCount} following</span>
          </div>

          <div className=" w-[500px]">
            <p className="text-[14px] text-justify">
              {!bio
                ? `"hello velonexa im ${username} aka ${displayname} 🤠"`
                : bio}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#ECECEC] h-[1px] w-full mt-[48px]"></div>
    </div>

    {isOpen && (
        <NewChatModal
        setChatValue={setChatValue}
        image={image}
        handleFalse={() => setIsOpen(false)}
        handleTrue={handleSendChat}
        value={chatValue}
        username={username}
        />
      )}
      </>
  );
};

export default UserDetailHeader;
