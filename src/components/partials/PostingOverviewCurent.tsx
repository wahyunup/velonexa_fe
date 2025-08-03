import Feedheader from "../ui/FeedHeader";
import InteracFeedCurrent from "./InteracFeedCurent";
import { createComment, getComment } from "../../services/comentApi";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import CommentList from "../ui/CommentList";
import { AnimatePresence, motion } from "framer-motion";

const PostingOverviewCurent = ({
  handlePostingOverview,
  user_id,
  username,
  createdAt,
  address,
  image,
  description,
  like_count,
  feedId,
  profileImage,
}: {
  handlePostingOverview: () => void;
  user_id: number;
  username: string;
  createdAt: string;
  address: string;
  profileImage: string;
  image: string;
  description: string;
  like_count: number;
  feedId: number;
}) => {
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    content: "",
  });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await getComment(feedId);
        const dataComment = res.data;
        console.log(res.data);
        setComments(dataComment);
      } catch (error: any) {
        console.log(error.msg);
      }
    };
    fetchComment();
  }, [feedId]);

  const handleChange = (e: any) => {
    setCommentForm({ content: e.target.value });
  };

  const handleCreateComment = async (e: any) => {
    e.preventDefault();
    try {
      await createComment(feedId, commentForm.content);
      const res = await getComment(feedId);
      setComments(res.data);
      setCommentForm({ content: "" });
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <>
      {/* kasih fixed dan overflow-scroll-x */}
      <div className=" flex justify-center flex-col fixed z-10 items-center w-full h-full">
        <div
          className="bg-black/20 backdrop-blur-xs fixed inset-0 z-10"
          onClick={handlePostingOverview}></div>
        {/* kasih mt 300px di container bawah jika ingin apply feat yang difreeze */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white px-[31px] py-[41px] z-20 rounded-2xl flex gap-[24px]  w-[1120.5px]">
            <div className="flex flex-col gap-[15px]">
              <Feedheader
                image={profileImage}
                id={user_id}
                username={username}
                datePosting={createdAt}
                address={address}
              />

              <div className="w-[603px] h-[603px] rounded-2xl overflow-hidden">
                <img className="object-cover h-full w-full" src={image} />
              </div>

              <InteracFeedCurrent
                isOpen={false}
                likeCount={like_count}
                feedId={feedId}
              />

              <p className="font-normal text-[15px] break-words w-[430px]">
                {description}
              </p>
            </div>
            <div className="w-full border border-[#EFEFEF] p-5 rounded-2xl bg-white flex flex-col justify-between">
              <div>
                <div className="border-b-1 border-[#EFEFEF] py-4 mb-5">
                  <h1 className="text-center text-[21px] font-medium text-[#434343]">
                    Comment
                  </h1>
                </div>
                {comments.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-400">belum ada komentar</p>
                  </div>
                ) : (
                  <div className="overflow-y-scroll h-[550px] thin-scrollbar ">
                    {comments.map((comment) => (
                      <CommentList
                        image={comment.user.image}
                        commentId={comment.id}
                        feedId={feedId}
                        createdAt={comment.likes.createdAt}
                        field_comment={comment.field_comment}
                        username={comment.user.username}
                      />
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleCreateComment}
                className="bg-[#F3F3F3] rounded-full flex px-[20px] items-center">
                <input
                  className="py-[11px] rounded-full w-full outline-none"
                  type="text"
                  name="comment"
                  placeholder="comment ..."
                  id=""
                  value={commentForm.content}
                  onChange={handleChange}
                />

                <button type="submit">
                  <FiSend size={18.04} color="#0047FF" />
                </button>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* freeze feat */}

        {/* <div>
        <div className="w-[300px] h-[300px] overflow-hidden">
          <img src={image} alt="" className="object-cover" />
        </div>
      </div> */}
      </div>
    </>
  );
};

export default PostingOverviewCurent;
