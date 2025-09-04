import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import type { CommentListProps } from "../ui";
import {
  createCommentLike,
  getCommentLikeStatus,
} from "../../services/comentApi";
import { createNotification } from "../../services/NotifApi";

const CommentList = ({
  user_id,
  username,
  field_comment,
  createdAt,
  feedId,
  commentId,
  image
}: CommentListProps) => {
  const [isLikeComment, setIsLikeComment] = useState(false);
  

  const handleLikeComment = async () => {
    try {
      await createCommentLike(feedId, commentId);
      setIsLikeComment((prev) => !prev);
      createNotification({
        target_id : user_id,
        type : "comment like",
        feed_id : feedId
      })
    } catch (error) {
      console.error("Gagal like/unlike:", error);
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await getCommentLikeStatus(feedId, commentId);
        setIsLikeComment(res.data.isLiked);
      } catch (error) {
        console.error("Gagal ambil status like:", error);
      }
    };

    fetchLikeStatus();
  }, []);

  return (
    <>
      <div className="py-[12px] even:bg-gray-50 rounded-2xl p-5">
        <div className="py-[10px] flex gap-[13px] items-center">
          <div className="2xl:w-[37px] 2xl:h-[37px] lg:w-[32px] lg:h-[32px] overflow-hidden rounded-full">
            <img
              className="object-cover h-full w-full "
              src={image}
              alt=""
            />
          </div>
          <span className="2xl:text-sm lg:text-sm font-medium">{username}</span>
        </div>

        <div className="flex flex-col gap-[9px]">
          <div className="flex justify-between">
            <p
              className="2xl:text-[14px] lg:text-[13px] text-[#535353] cursor-pointer"
              onDoubleClick={handleLikeComment}>
              {field_comment}
            </p>

            {!isLikeComment ? (
              <button className="cursor-pointer" onClick={handleLikeComment}>
                <GoHeart size={13.36} />
              </button>
            ) : (
              <button className="cursor-pointer" onClick={handleLikeComment}>
                <GoHeartFill size={13.36} color="red" />
              </button>
            )}
          </div>

          <div className="flex justify-between px-[17px]">
            <span className="text-[11px] font-medium text-[#ccc]">
              {createdAt}
            </span>

            <button className="text-[#535353] 2xl:text-[14px] lg:text-[12px] font-medium cursor-pointer">
              reply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentList;
