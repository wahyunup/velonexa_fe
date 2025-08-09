import { useEffect, useState } from "react";
import { getUserDetail } from "../../services/userApi";
import AppLayout from "../layout/AppLayout";
import UserDetailHeader from "../../components/partials/UserDetailHeader";
import UserDetailFeed from "../../components/partials/UserDetailFeed";
import { FaSpinner } from "react-icons/fa6";
import type { GetFeedProps } from "../../components/ui";
import PostingOverviewCurent from "../../components/partials/PostingOverviewCurent";
import { getFollowers, getFollows } from "../../services/followApi";

const CurentUserDetail = () => {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    displayname: "",
    bio: "",
    email: "",
    image: "",
  });

  console.log("user ===>", user);

  const [feed, setFeed] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);
  const [postingOverview, setPostingOverview] = useState(false);

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

  return (
    <>
      <AppLayout
        classname={`${!loading ? "justify-between items-center" : ""}`}>
        {!loading ? (
          <>
            <FaSpinner size={23} className="animate-spin" />
          </>
        ) : (
          <>
            <div className="w-full">
              <div className="px-3">
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

              

                <div className="grid grid-cols-3 w-full gap-3 mt-[63px]">
                  {feed.map((f: GetFeedProps) => (
                    <div
                      key={f.id}
                      className="  aspect-square overflow-hidden cursor-pointer"
                      onClick={() => handleSelectedFeed(f)}>
                      <UserDetailFeed image={f.image} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {postingOverview && selectedFeed && (
              <PostingOverviewCurent
                profileImage={user.image}
                address={selectedFeed.address}
                createdAt={selectedFeed.createdAt}
                description={selectedFeed.description}
                feedId={selectedFeed.id}
                handlePostingOverview={() => setPostingOverview(false)}
                image={selectedFeed.image}
                like_count={selectedFeed.like_count}
                user_id={selectedFeed.user_id}
                username={user.username}
              />
            )}
          </>
        )}
      </AppLayout>
    </>
  );
};

export default CurentUserDetail;
