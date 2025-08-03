import { useEffect, useState } from "react";
import type { UserDetailHeaderProps } from "../ui";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/userApi";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { MdVerified } from "react-icons/md";
import { Follow, unfollow } from "../../services/followApi";
import { createNotification } from "../../services/NotifApi";

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

  console.log("is follow", isFollow);

  const handleIsFollow = async () => {
    try {
      const res = await Follow(userId);
      setIsFollow(res.follow.isFollow);
      createNotification({
        target_id: userId,
        type: "follow",
        feed_id: null,
      });

      fetchFollowing();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    const res = await unfollow(userId);
    setIsFollow(res.unfollow.isFollow);
    getStatus();
    fetchFollowing()
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getToken();
      const decode = jwtDecode(user) as JwtPayload & { email: string };
      setCurrentUser({ email: decode.email });
    };
    fetchData();
  }, []);

  let actionButton;

  if (currentUser.email !== email) {
    actionButton = isFollow ? (
      <button
        onClick={handleUnfollow}
        className="text-[14px] font-medium p-[10px] text-[#3971FF] outline outline-[#3971FF] bg-[#ebf1ff] rounded-xl">
        unfollow
      </button>
    ) : (
      <button
        onClick={handleIsFollow}
        className="text-[14px] font-medium p-[10px] text-white bg-[#3971FF] rounded-xl">
        follow
      </button>
    );
  } else {
    actionButton = (
      <button
        onClick={() => route("/setting/profile")}
        className="text-[14px] font-medium p-[10px] text-white bg-[#3971FF] rounded-xl">
        Edit Profile
      </button>
    );
  }

  return (
    <div className="sticky top-10 bg-[#FCFCFC]">
      <div className="flex gap-[37px]">
        <div className="flex flex-col items-center gap-[18px]">
          <div className="w-[131px] h-[131px] rounded-full overflow-hidden">
            <img className="object-cover w-full h-full" src={image} alt="" />
          </div>
          {actionButton}
        </div>

        <div className="flex gap-[20px] flex-col">
          <div className="flex gap-[2px] flex-col">
            <h1 className="text-[24px] font-medium flex items-center gap-1">
              {displayname}
              <MdVerified className=" right-0 bottom-10" color="#3971FF" />
            </h1>
            <span className="text-[16px] text-[#A5A5A5]">@{username}</span>
          </div>
          <div className="flex gap-[50px]">
            <span className="text-[19px]">{postCount} post</span>
            <span className="text-[19px]">{followerCount} followers</span>
            <span className="text-[19px]">{followingCount} following</span>
          </div>

          <div className="w-[819px]">
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
  );
};

export default UserDetailHeader;
