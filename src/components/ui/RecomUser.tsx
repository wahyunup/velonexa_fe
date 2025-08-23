import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { Follow, getFollowers } from "../../services/followApi";
import {getUserDetail } from "../../services/userApi";
import { createNotification } from "../../services/NotifApi";
import { useNavigate } from "react-router-dom";

const RecomUser = ({
  id,
  username,
  displayname,
  image,
}: {
  id: number;
  username: string;
  displayname: string;
  image: string;
}) => {
  const [isFollow, setIsFollow] = useState(false);
  const [currentUser_id, setCurrentUser_id] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await getUserDetail();
      setCurrentUser_id(res.user.id);
    };
    fetchCurrentUser();
  }, []);

  const getStatus = async () => {
    const res = await getFollowers(id);
    const status = Array.isArray(res.followingMaping)
      ? res.followingMaping.some(
          (item: any) =>
            item.isFollow === true && item.user_id === currentUser_id
        )
      : false;
    setIsFollow(status);
  };

  useEffect(() => {
    getStatus();
  }, [id, currentUser_id]);

  const handleFollow = async () => {
    const res = await Follow(id);
    setIsFollow(res.follow.isFollow);
    createNotification({
      target_id: id,
      type: "follow",
      feed_id: null,
    });
  };

  return (
    <>
      <div className="flex justify-between gap-3">
        <div className="flex gap-[13px]">
          <a
            href={`/userdetail/${id}`}
            className="h-[37px] w-[37px] rounded-full overflow-hidden">
            <img className="object-cover w-full h-full" src={image} alt="" />
          </a>
          <div className="flex flex-col ">
            <div className="flex items-center gap-1">
              <a
                href={`/userdetail/${id}`}
                className="text-[13px] font-medium">
                {displayname}
              </a>
              <MdVerified className=" right-0 bottom-10" color="#3971FF" />
            </div>
            <a href={`/userdetail/${id}`} className="text-[11px] font-normal">
              @{username}
            </a>
          </div>
        </div>
        {currentUser_id !== id ? (
          isFollow ? (
            <button
              onClick={() => navigate(`/userdetail/${id}`)}
              className="cursor-pointer font-normal text-[12px] px-[16px] py-[5px] text-[#3971FF] rounded-full bg-[#dde7ff] border-[#d0deff] hover:border-[#3971FF] border transition-all duration-300">
              see post
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="cursor-pointer font-normal text-[12px] px-[16px] py-[5px] bg-[#3971FF] text-white rounded-full">
              Follow
            </button>
          )
        ) : null}
      </div>
    </>
  );
};

export default RecomUser;
