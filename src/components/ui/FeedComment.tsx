import { useEffect, useState } from "react";
import { getComment } from "../../services/comentApi";

const FeedComment = ({handlePostingOverview, feedId}:{handlePostingOverview : () => void, feedId: number}) => {
  const [comments, setComments] = useState([]);

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


    return (
        <div className="flex flex-col gap-2">
        <span onClick={handlePostingOverview} className="text-[14px] text-[#888888] font-medium cursor-pointer">see {comments.length} comment</span>
        <input type="text" className="bg-[#F8F8F8] py-[11px] px-[20px]" placeholder="comment"/>
        </div>
    )
}

export default FeedComment