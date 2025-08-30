import axios from "axios";
import FeedComment from "../ui/FeedComment";
import FeedDesc from "../ui/FeedDesc";
import Feedheader from "../ui/FeedHeader";
import InteracFeed from "../ui/interacFeed";
import { useEffect, useState } from "react";
import type { GetFeedProps } from "../ui";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaArrowUpLong } from "react-icons/fa6";
import { PiCoffeeDuotone } from "react-icons/pi";
import PostingOverview from "./PostingOverview";
import FeedSkeleton from "../../skeleton/Feed/FeedSkeleton";

const Feed = () => {
  const [feed, setFeed] = useState<GetFeedProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [postingOverview, setPostingOverview] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);

  const getFeed = async () => {
    try {
      const res = await axios.get(
        `https://velonexa-be.vercel.app/feeds?page=${page}&limit=3`
      );
      const data = res.data;
      setFeed(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostingOverview = (post: GetFeedProps) => {
    setSelectedFeed(post);
    setPostingOverview(!postingOverview);
  };

  useEffect(() => {
    setIsLoading(true);
    getFeed();
  }, [page]);

  const handlePagination = () => {
    try {
      setPage((prevPage) => (prevPage += 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevPagination = () => {
    try {
      setPage((prevPage) => (prevPage -= 1));
    } catch (error) {
      console.log(error);
    }
  };

  const handlingReport = (feedId:number) => {
    setFeed((prev) => prev.filter(feed => feed.id !== feedId))
  }

  return (
    <>
      {page > 1 && (
        <div className="flex justify-center my-10">
          <button
            onClick={handlePrevPagination}
            className="bg-gray-100 outline-[#3971FF] text-[15px] text-[#3971FF] animate-bounce rounded-full outline px-5 py-2 flex flex-row-reverse items-center justify-center gap-2">
            load previous <FaArrowUpLong />
          </button>
        </div>
      )}
      {isLoading ? (
        Array.from({length:2}).map(() => (
            <div className="flex flex-col">
            <FeedSkeleton/>
            </div>
          ))
      ) : (
        <div className="flex flex-col gap-20 mt-24 2xl:w-[500px] lg:w-[450px]">
          {feed.map((data) => {
            return (
              <div className="flex flex-col gap-[15px]" key={data.id}>
                <Feedheader
                  handlingReport={handlingReport}
                  feed_id={data.id}
                  id={data.user_id}
                  image={data.user.image}
                  username={data.user.username}
                  datePosting={data.createdAt}
                  address={data.address}
                />
                <div className="w-full h-[415px] rounded-2xl overflow-hidden">
                  <img
                    className="object-cover h-full w-full"
                    src={data.image}
                  />
                </div>
                <InteracFeed
                  user_id={data.user_id}
                  isOpen={true}
                  likeCount={data.like_count}
                  feedId={data.id}
                  refreshFeed={getFeed}
                />
                <FeedDesc
                  description={data.description}
                  username={data.user.username}
                />
                <FeedComment
                  user_id={data.user_id}
                  feedId={data.id}
                  handlePostingOverview={() => handlePostingOverview(data)}
                />
              </div>
            );
          })}
        </div>
      )}
      {feed.length === 3 && (
        <div className="flex justify-center my-10">
          <button
            onClick={handlePagination}
            className="bg-gray-100 outline-[#3971FF] text-[15px] text-[#3971FF] animate-bounce rounded-full outline px-5 py-2 flex flex-row-reverse items-center justify-center gap-2">
            load more <FaArrowDownLong />
          </button>
        </div>
      )}

      {!isLoading && feed.length === 0 && (
        <div className="flex flex-col items-center gap-3 justify-center">
          <PiCoffeeDuotone size={80} color="#3971FF" />
          <span className="text-[15px] text-[#3971FF]">
            You've reached the end of the feed
          </span>
        </div>
      )}

      {postingOverview && selectedFeed && (
        <PostingOverview
          handlingReport={handlingReport}
          profileImage={selectedFeed.user.image}
          feedId={selectedFeed.id}
          getFeed={getFeed}
          like_count={selectedFeed.like_count}
          handlePostingOverview={() => setPostingOverview(false)}
          address={selectedFeed.address}
          createdAt={selectedFeed.createdAt}
          description={selectedFeed.description}
          image={selectedFeed.image}
          user_id={selectedFeed.user_id}
          username={selectedFeed.user.username}
        />
      )}
    </>
  );
};

export default Feed;
