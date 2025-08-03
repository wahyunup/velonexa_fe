import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import type { InteracFeedProps } from "../ui";
import axios from "axios";
import { createNotification } from "../../services/NotifApi";

const InteracFeed = ({
  likeCount,
  feedId,
  refreshFeed,
  isOpen,
  user_id,
}: InteracFeedProps) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [isLike, setIsLike] = useState();
  const [isSave, setIsSave] = useState(false);

  const getLikeStatus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/feed/likes/${feedId}`,
        {
          withCredentials: true,
        }
      );
      console.log("dapet dari status like ===>", res.data.data.isLike);
      setLikeStatus(res.data.data.isLike);
      setIsLike(res.data.data.isLike);
    } catch (error) {}
  };

  const fetchLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/feed/like/${feedId}`,
        { like: !isLike },
        { withCredentials: true }
      );
      console.log("data dari backend ===>", res.data.msg);
      setIsLike(res.data.isLike);
      setLikeStatus(res.data.isLike);
      refreshFeed();
      createNotification({
        target_id: user_id,
        type: "like",
        feed_id: feedId,
      });
    } catch (error: any) {
      console.log("Error:", error?.response?.data?.msg || error.message);
    }
  };

  console.log("user iddddddd ====>",user_id);
  

  useEffect(() => {
    getLikeStatus();
    refreshFeed();
  }, [feedId]);

  const handleIsSave = () => setIsSave(!isSave);
  return (
    <div className="flex flex-col gap-[9px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <button onClick={fetchLike} className="cursor-pointer">
            {likeStatus ? (
              <GoHeartFill size={34} stroke="red" color="red" />
            ) : (
              <GoHeart size={34} />
            )}
          </button>
          <BsShare size={25} />
        </div>
        <button onClick={handleIsSave} className="cursor-pointer">
          {isSave ? (
            <IoBookmark size={34} color="orange" />
          ) : (
            <IoBookmarkOutline size={34} />
          )}
        </button>
      </div>
      {isOpen && (
        <span className="text-[17px] font-medium">{likeCount} Like</span>
      )}
    </div>
  );
};

export default InteracFeed;
