import { useEffect, useState } from "react";
import { createComment, getComment } from "../../services/comentApi";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import { FiSend } from "react-icons/fi";
import { createNotification } from "../../services/NotifApi";

const FeedComment = ({
  handlePostingOverview,
  feedId,
  user_id
}: {
  handlePostingOverview: () => void;
  feedId: number;
  user_id: number
}) => {
  const [comments, setComments] = useState([]);
  const [userLogin, setUserLogin] = useState({ image: "" });
    const [commentForm, setCommentForm] = useState({
    content: "",
  });



  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken();
      const decode = jwtDecode(res);

      setUserLogin({ image: decode.image });
    };
    fetchToken();
  });

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await getComment(feedId);
        const dataComment = res.data;
        setComments(dataComment);
      } catch (error: any) {
        console.log(error.msg);
      }
    };
    fetchComment();
  }, [feedId]);

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

      const handleChange = (e: any) => {
    setCommentForm({ content: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <span
        onClick={handlePostingOverview}
        className="text-[14px] text-[#888888] font-medium cursor-pointer">
        see {comments.length} comment
      </span>
      <form onSubmit={handleCreateComment} className="flex items-center bg-[#F8F8F8] rounded-full py-[8px] pr-[15px] gap-3">
        <div className="overflow-hidden rounded-full aspect-square w-9 h-8">
          <img
            src={userLogin.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <input type="text" onChange={handleChange} value={commentForm.content} name="comment" className="w-full outline-0" placeholder="comment" />
        <button type="submit">
        <FiSend size={20} color="#0047FF" />
        </button>
      </form>
    </div>
  );
};

export default FeedComment;
