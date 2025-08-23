import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { BsShare } from "react-icons/bs";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import type { InteracFeedProps, MyJwtPayload } from "../ui";
import axios from "axios";
import { createNotification } from "../../services/NotifApi";
import { createBookmark, getBookmark } from "../../services/bookmarkApi";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";

const InteracFeed = ({
  likeCount,
  feedId,
  refreshFeed,
  isOpen,
  user_id,
}: InteracFeedProps) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [isLike, setIsLike] = useState();
  const [isBookmark, setIsBookmark] = useState(false);
  const [userLogin, setUserLogin] = useState<MyJwtPayload>()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken()
      const decode = jwtDecode<MyJwtPayload>(res)
      setUserLogin(decode)      
    }
    fetchUser()
  },[])
  

  useEffect(() => {
    const getBookmarkStatus = async () => {
      const res = await getBookmark(user_id);
      const saved = res.bookmark.some((b:any) => b.isSaved && b.feed_id === feedId && b.actor_id === userLogin?.id);
      setIsBookmark(saved);
    };
    getBookmarkStatus();
  }, [feedId, user_id]);

  useEffect(() => {
    const getLikeStatus = async () => {
      try {
        const res = await axios.get(
          `https://velonexa-be.vercel.app/feed/likes/${feedId}`,
          {
            withCredentials: true,
          }
        );
        setLikeStatus(res.data.data.isLike);
        setIsLike(res.data.data.isLike);
      } catch (error) {}
    };
    getLikeStatus();
  }, [feedId]);

  const fetchLike = async () => {
    try {
      const res = await axios.post(
        `https://velonexa-be.vercel.app/feed/like/${feedId}`,
        { like: !isLike },
        { withCredentials: true }
      );
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

  const handleIsSave = async () => {
    const res = await createBookmark(feedId);
    setIsBookmark(res.isSaved);
  };

  const handleUnSave = async () => {
    const res = await createBookmark(feedId);
    setIsBookmark(res.isSaved);
  };

  useEffect(() => {
    refreshFeed();
  }, [feedId]);

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
        <button className="cursor-pointer">
          {isBookmark ? (
            <IoBookmark onClick={handleUnSave} size={34} color="orange" />
          ) : (
            <IoBookmarkOutline onClick={handleIsSave} size={34} />
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
