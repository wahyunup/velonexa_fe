import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import { getFeeds } from "../../services/FeedApi";
import { FaSpinner } from "react-icons/fa6";
import PostingOverview from "../../components/partials/PostingOverview";
import type { GetFeedProps } from "../../components/ui";
import { PiCoffeeDuotone } from "react-icons/pi";
import { Navigate, useNavigate } from "react-router-dom";
import { getToken } from "../../services/userApi";
import ExplorerSkeleton from "../../skeleton/Explorer/ExplorerSkeleton";

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
      setIsLoading(false)
    };
    fetchFeed();
  }, []);

  const handleSelectedFeed = (feed: GetFeedProps) => {
    setSelectedFeed(feed);
    setPostingOverview(true);
  };

   const handlingReport = (feedId:number) => {
    setFeeds((prev) => prev.filter(feed => feed.id !== feedId))
  }

  return (
    <AppLayout classname="">
      <div className="flex justify-center w-full pt-10 ">
        <div className="">
        <div className="grid grid-cols-3 gap-3 px-10">
          {isLoading ? (
            
              Array.from({length: 9}).map(() => (

                <ExplorerSkeleton/>
              ))
          ) : feeds.length > 0 ? (
            <>
              {feeds.map((feed: GetFeedProps) => (
                <div
                  className="w-[268px] h-[268px] cursor-pointer overflow-hidden"
                  onClick={() => handleSelectedFeed(feed)}>
                  <img
                    src={feed.image}
                    className="aspect-square object-cover h-full w-full"
                    alt=""
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="w-[70vw] h-[100vh]  ">

            <div className="flex items-center justify-center flex-col gap-5 ">
              <PiCoffeeDuotone size={80} color="#3971FF" />
              <span className="text-center text-[16px] font-medium text-[#3971FF]">
                Looks like there's nothing to see here yet. <br /> Let's start
                uploading something!
              </span>
            </div>
            </div>
         
          )}
        </div>
        </div>
      </div>

      {postingOverview && selectedFeed && (
        <PostingOverview
        handlingReport={handlingReport}
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
