import { useEffect, useState } from "react";
import Feedheader from "../ui/FeedHeader";
import InteracFeed from "../ui/interacFeed";
import { createComment, getComment } from "../../services/comentApi";
import { FiSend } from "react-icons/fi";
import CommentList from "../ui/CommentList";
import { createNotification } from "../../services/NotifApi";
import { motion, AnimatePresence } from "framer-motion";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import type { appLayoutProps } from "../../pages/layout/type";
import type { CommentProps } from "../ui";
const PostingOverview = ({
  handlePostingOverview,
  user_id,
  username,
  createdAt,
  address,
  image,
  description,
  like_count,
  feedId,
  getFeed,
  profileImage,
  handlingReport
}: {
  handlePostingOverview: () => void;
  user_id: number;
  username: string;
  createdAt: string;
  address: string;
  image: string;
  profileImage: string;
  description: string;
  like_count: number;
  feedId: number;
  getFeed: () => void;
  handlingReport: (feed_id:number) => void
}) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
    image: "",
  });
  const [commentForm, setCommentForm] = useState({
    content: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken();
      const decode = jwtDecode(res) as appLayoutProps;
      setUser({ image: decode.image });
    };
    fetchUser();
  }, []);

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
      createNotification({
        target_id: user_id,
        type: "comment",
        feed_id: feedId,
      });
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <>
      <div className="justify-center fixed inset-0 z-10 flex items-center w-full h-full ">
        <div
          className="bg-black/20 backdrop-blur-xs fixed inset-0 z-10"
          onClick={handlePostingOverview}></div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white px-[31px] py-[41px] w-[1120.5px] z-20 rounded-2xl flex gap-[24px]">
            <div className="flex flex-col gap-[15px] ">
              <Feedheader
                handlingReport={handlingReport}
                feed_id={feedId}
                image={profileImage}
                id={user_id}
                username={username}
                datePosting={createdAt}
                address={address}
              />

              <div
                onClick={() => setIsOpen(true)}
                className="w-[603px] h-[603px] rounded-2xl overflow-hidden cursor-zoom-in">
                <img className="object-cover h-full w-full" src={image} />
              </div>

              {isOpen && (
                <div
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 cursor-zoom-out"
                  onClick={() => setIsOpen(false)}>
                  <img
                    src={image}
                    className="max-w-[90%] max-h-[90%] rounded-md shadow-lg"
                  />
                </div>
              )}

              <InteracFeed
                isOpen={false}
                user_id={user_id}
                likeCount={like_count}
                feedId={feedId}
                refreshFeed={getFeed}
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
                    <p className="text-gray-500">belum ada komentar</p>
                  </div>
                ) : (
                  <div className="overflow-y-scroll h-[550px] thin-scrollbar ">
                    {comments.map((comment: CommentProps) => (
                      <>
                        <CommentList
                          user_id={comment.user.id}
                          image={comment.user.image}
                          createdAt={comment.likes.createdAt}
                          field_comment={comment.field_comment}
                          username={comment.user.username}
                          commentId={comment.id}
                          feedId={feedId}
                        />
                      </>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleCreateComment}
                className="bg-[#F3F3F3] rounded-full flex pl-[10px] pr-[20px] items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
                    <img
                      src={user.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <input
                    className="py-[11px] outline-none"
                    type="text"
                    name="comment"
                    placeholder="comment ..."
                    id=""
                    value={commentForm.content}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit">
                  <FiSend size={18.04} color="#0047FF" />
                </button>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default PostingOverview;
