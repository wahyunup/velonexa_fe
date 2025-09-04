import { useEffect, useState } from "react";
// import Feedheader from "../ui/FeedHeader";
// import InteracFeed from "../ui/interacFeed";
import { createComment, getComment } from "../../services/comentApi";
import { FiSend } from "react-icons/fi";
import CommentList from "../ui/CommentList";
import { createNotification } from "../../services/NotifApi";
import { motion, AnimatePresence } from "framer-motion";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import type { appLayoutProps } from "../../pages/layout/type";
import type { CommentProps } from "../ui";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import CommentListSkeleton from "../../skeleton/CommentList/CommentListSkeleton";
import { SyncLoader } from "react-spinners";
const PostingOverview = ({
  handlePostingOverview,
  user_id,
  username,
  // createdAt,
  // address,
  image,
  description,
  // like_count,
  feedId,
  // getFeed,
  profileImage,
}: // handlingReport
{
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
  handlingReport: (feed_id: number) => void;
}) => {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState({
    image: "",
  });
  const [commentForm, setCommentForm] = useState({
    content: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSendComment, setIsLoadingSendComment] = useState(false);
  const [isLoadingUserProfile, setIsLoadingUserProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoadingUserProfile(true);
    const fetchUser = async () => {
      const res = await getToken();
      if (!res) {
        navigate("/auth/login");
        setUser({ image: "" });
      }
      const decode = jwtDecode(res) as appLayoutProps;
      setUser({ image: decode.image });
      setIsLoadingUserProfile(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        setIsLoading(true);
        const res = await getComment(feedId);
        const dataComment = res.data;
        setComments(dataComment);
        setIsLoading(false);
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
      setIsLoadingSendComment(true)
      await createComment(feedId, commentForm.content);
      const res = await getComment(feedId);
      setComments(res.data);
      setCommentForm({ content: "" });
      setIsLoadingSendComment(false)
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
      <div className="justify-center fixed inset-0 z-10 flex items-center w-full h-full">
        <div
          className="bg-black/20 backdrop-blur-xs fixed inset-0 z-10"
          onClick={handlePostingOverview}></div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white 2xl:px-[31px] 2xl:py-[41px] lg:p-3 2xl:w-[1120.5px] 2xl:h-[800px] lg:w-[850px] lg:h-[600px] z-20 rounded-2xl flex gap-3">
            <div className="flex flex-col gap-[15px]">
              <div
                onClick={() => setIsOpen(true)}
                className="2xl:w-[603px] 2xl:h-full rounded-2xl overflow-hidden cursor-zoom-in bg-black h-full flex items-center lg:w-[450px]">
                <img
                  className="object-cover aspect-square w-full"
                  src={image}
                />
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
            </div>

            <div className="  flex flex-col gap-3 bg-white w-full">
              <div className="2xl:w-full overflow-y-scroll thin-scrollbar flex flex-col justify-between p-5 rounded-2xl border border-[#EFEFEF] h-full">
                <div className="border-b-1 border-[#EFEFEF] py-4 mb-5">
                  <div className="flex items-center gap-4 pb-3">
                    <a
                      href={`/userdetail/${user_id}`}
                      className="w-8 h-8 overflow-hidden rounded-full">
                      <img
                        src={profileImage}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </a>
                    <div className="flex items-center gap-1">
                      <a
                        href={`/userdetail/${user_id}`}
                        className="text-sm font-semibold">
                        {username}
                      </a>
                      <MdVerified color="#3971FF" />
                    </div>
                  </div>
                  <p className="text-sm">~ {description}</p>
                </div>
                {comments.length < 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">belum ada komentar</p>
                  </div>
                ) : (
                  <div className=" 2xl:h-full lg:h-[350px]  ">
                    {isLoading
                      ? Array.from({ length: 5 }).map(() => (
                          <CommentListSkeleton />
                        ))
                      : comments.map((comment: CommentProps) => (
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

              <div className="bg-white sticky bottom-0 w-full">
                <form
                  onSubmit={handleCreateComment}
                  className="bg-gray-100 rounded-full flex pl-[7px] pr-[20px] items-center justify-between ">
                  <div className="flex items-center gap-3 ">
                    {isLoadingUserProfile ? (
                      <div className="bg-gray-300 h-[30px] w-[30px] rounded-full animate-pulse"></div>
                    ) : (
                      <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
                        <img
                          src={user?.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <input
                      className="py-[11px] outline-none text-sm"
                      type="text"
                      name="comment"
                      placeholder="comment ..."
                      id=""
                      value={commentForm.content}
                      onChange={handleChange}
                    />
                  </div>

                  {isLoadingSendComment ? (
                    <SyncLoader size={8} margin={1} color="#3971FF" speedMultiplier={0.5}/>
                  ) : (
                    <button type="submit" className="cursor-pointer">
                      <FiSend size={18.04} color="#0047FF" />
                    </button>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default PostingOverview;
