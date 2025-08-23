import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/userApi";
import AppLayout from "../layout/AppLayout";
import UserDetailHeader from "../../components/partials/UserDetailHeader";
import UserDetailFeed from "../../components/partials/UserDetailFeed";
import type { GetFeedProps } from "../../components/ui";
import PostingOverviewCurent from "../../components/partials/PostingOverviewCurent";
import { getFollowers, getFollows } from "../../services/followApi";
import UserDetailSkeleton from "../../skeleton/CurrentUserDetails/UserDetailSkeleton";
import { IoImageOutline } from "react-icons/io5";
import { IoImage } from "react-icons/io5";
import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { getBookmark } from "../../services/bookmarkApi";
import { GoBookmarkSlash } from "react-icons/go";

const CurentUserDetail = () => {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    displayname: "",
    bio: "",
    email: "",
    image: "",
  });

  const [feed, setFeed] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);
  const [postingOverview, setPostingOverview] = useState(false);
  const [isActive, setIsActive] = useState("post");

  useEffect(() => {
    if (selectedFeed) {
      console.log("Selected feed:", feed);
    }
  }, [selectedFeed]);

  const handleSelectedFeed = (f: GetFeedProps) => {
    setSelectedFeed(f);
    setPostingOverview(!postingOverview);
  };

  useEffect(() => {
    try {
      const fetchFollow = async () => {
        const res = await getFollows();
        setFollowing(res.followingMaping);
      };
      fetchFollow();
    } catch (error: any) {
      console.log(error.msg);
    }
  }, [user.id]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const res = await getFollowers(user.id);
      setFollowers(res.followingMaping);
    };
    fetchFollowers();
  }, [user.id]);

  useEffect(() => {
    const fetchCurentUser = async () => {
      const userCurrent = await getUserDetail();
      setFeed(userCurrent.user.feed);
      setUser({
        id: userCurrent.user.id,
        username: userCurrent.user.username,
        displayname: userCurrent.user.display_name,
        bio: userCurrent.user.bio?.bio,
        email: userCurrent.user.email,
        image: userCurrent.user.image,
      });
      setLoading(true);
    };
    fetchCurentUser();
  }, [user.id]);

  const handlingReport = (feed_id: number) => {
    setFeed((prev) => prev.filter((feed:{id:number}) => feed.id !== feed_id));
  };

  useEffect(() => {
    const fetchBookmark = async () => {
      const res = await getBookmark(user.id);
      console.log("bookmark", res.bookmark);
      setBookmark(res.bookmark);
    };
    fetchBookmark();
  }, [user.id]);

  return (
    <>
      <AppLayout
        classname={`${!loading ? "justify-between items-center" : ""}`}>
        {!loading ? (
          <>
            <UserDetailSkeleton />
          </>
        ) : (
          <>
            <div className=" w-full flex justify-center">
              <div className="2xl:w-[1000px] px-10">
                <UserDetailHeader
                  userId={user.id}
                  image={user.image}
                  email={user.email}
                  bio={user.bio}
                  displayname={user.displayname}
                  postCount={feed.length}
                  username={user.username}
                  followerCount={followers.length}
                  followingCount={following.length}
                />

                <div className="flex p-[10px] justify-center gap-10 mt-[12px]">
                  <button
                    onClick={() => setIsActive("post")}
                    className={`cursor-pointer flex gap-2 items-center ${
                      isActive === "post" ? "text-[#3971FF]" : "text-gray-400"
                    } `}>
                    {isActive === "post" ? (
                      <IoImage size={25} />
                    ) : (
                      <IoImageOutline size={25} />
                    )}
                    <span className="text-lg font-medium">Post</span>
                  </button>
                  <button
                    onClick={() => setIsActive("saved")}
                    className={` relative cursor-pointer flex gap-2 items-center ${
                      isActive === "saved" ? "text-[#3971FF]" : "text-gray-400"
                    } `}>
                    {isActive === "saved" ? (
                      <BsBookmarkCheckFill size={25} />
                    ) : (
                      <BsBookmarkCheck size={25} />
                    )}
                    <span className="text-lg">Saved</span>
                  </button>
                </div>

                <div className="grid grid-cols-3  gap-3 mt-[63px]">
                  {isActive === "post" ? (
                    <>
                      {feed.map((f: GetFeedProps) => (
                        <div
                          key={f.id}
                          className=" aspect-square overflow-hidden cursor-pointer"
                          onClick={() => handleSelectedFeed(f)}>
                          <UserDetailFeed image={f.image} />
                        </div>
                      ))}
                    </>
                  ) : isActive === "saved" ? (
                    <>
                      {bookmark.length > 0 ? (
                        bookmark.map((b: GetFeedProps) => (
                          <div
                            key={b.id}
                            className=" aspect-square overflow-hidden cursor-pointer"
                            onClick={() => handleSelectedFeed(b.feed)}>
                            <UserDetailFeed image={b.feed?.image} />
                          </div>
                        ))
                      ) : (
                        <>
                          <div></div>
                          <div className="flex flex-col items-center gap-5">
                            <GoBookmarkSlash size={40} />
                            <h1 className="text-[21px] font-medium text-center ">
                              No Saved Posts Yet
                            </h1>
                            <p className=" text-center text-[16px]">
                              Save posts to easily find them again later.
                            </p>
                          </div>
                          <div></div>
                        </>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {postingOverview && selectedFeed && (
              <PostingOverviewCurent
                handlingReport={() => handlingReport(selectedFeed.id)}
                profileImage={
                  isActive === "saved" ? selectedFeed?.user?.image : user.image
                }
                address={selectedFeed.address}
                createdAt={selectedFeed.createdAt}
                description={selectedFeed.description}
                feedId={selectedFeed.id}
                handlePostingOverview={() => setPostingOverview(false)}
                image={selectedFeed.image}
                like_count={selectedFeed.like_count}
                user_id={selectedFeed.user_id}
                username={
                  isActive === "saved"
                    ? selectedFeed?.user?.username
                    : user.username
                }
              />
            )}
          </>
        )}
      </AppLayout>
    </>
  );
};

export default CurentUserDetail;
