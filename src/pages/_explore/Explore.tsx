import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import { getFeeds } from "../../services/FeedApi";
import { FaSpinner } from "react-icons/fa6";
import PostingOverview from "../../components/partials/PostingOverview";
import type { GetFeedProps } from "../../components/ui";
import { PiCoffeeDuotone } from "react-icons/pi";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken } from "../../services/userApi";

const Explore = () => {
  const [feeds, setFeeds] = useState<GetFeedProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);
  const [postingOverview, setPostingOverview] = useState(false);

  console.log(selectedFeed);

    
  useEffect(() => {
    const fetchFeed = async () => {
      setIsLoading(true);
      const data = await getFeeds();
      setFeeds(data.data);
    };
    fetchFeed();
  }, []);

  const handleSelectedFeed = (feed: GetFeedProps) => {
    setSelectedFeed(feed);
    setPostingOverview(true);
  };

  return (
    <AppLayout classname="flex">
      <div className="flex justify-center  w-full pt-10 px-10">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 ">
          {!isLoading ? (
            <div className="flex w-full justify-center items-center">
              <FaSpinner size={23} className="animate-spin" />
            </div>
          ) : feeds.length > 0 ? (
            <>
              {feeds.map((feed: GetFeedProps) => (
                <button
                  className="max-w-[300px] max-h-[300px] cursor-pointer overflow-hidden"
                  onClick={() => handleSelectedFeed(feed)}>
                  <img
                    src={feed.image}
                    className="aspect-square object-cover h-full w-full"
                    alt=""
                  />
                </button>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center w-full flex-col gap-5">
              <PiCoffeeDuotone size={80} color="#3971FF" />
              <span className="text-center text-[16px] font-medium text-[#3971FF]">
                Looks like there's nothing to see here yet. <br /> Let's start
                uploading something!
              </span>
            </div>
          )}
        </div>
      </div>

      {postingOverview && selectedFeed && (
        <PostingOverview
         profileImage={selectedFeed.user.image}
          address={selectedFeed?.address}
          createdAt={selectedFeed?.createdAt}
          description={selectedFeed?.description}
          feedId={selectedFeed?.id}
          getFeed={getFeeds}
          handlePostingOverview={() => setPostingOverview(false)}
          image={selectedFeed?.image}
          like_count={selectedFeed?.like_count}
          user_id={selectedFeed?.user_id}
          username={selectedFeed?.user.username}
        />
      )}
    </AppLayout>
  );
};

export default Explore;
