import { useEffect, useState } from "react";
import { detailUser, getToken, getUserDetail } from "../../services/userApi";
import AppLayout from "../layout/AppLayout";
import UserDetailHeader from "../../components/partials/UserDetailHeader";
import UserDetailFeed from "../../components/partials/UserDetailFeed";
import { FaSpinner } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { GetFeedProps } from "../../components/ui";
import PostingOverview from "../../components/partials/PostingOverview";
import { getFeeds } from "../../services/FeedApi";
import {
  getFollowers,
  getFollowersUser,
  getFollows,
} from "../../services/followApi";

const UserDetail = () => {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    displayname: "",
    bio: "",
    email: "",
    image: "",
  });

  // console.log("user ===>", user);

  const [feed, setFeed] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);
  const [postingOverview, setPostingOverview] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [currentUser_id, setCurrentUser_id] = useState(0);

  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const user = await detailUser(userId);
      setFeed(user.user.feed);
      setUser({
        id: user.user.id,
        username: user.user.username,
        displayname: user.user.display_name,
        bio: user.user.bio?.bio,
        email: user.user.email,
        image: user.user.image,
      });
      setLoading(true);
    };
    fetchUserDetail();
  }, []);

  const fetchFollow = async () => {
    const res = await getFollowers(userId);
    setFollowers(res.followingMaping);
  };

  const fetchFollowers = async () => {
    const res = await getFollowersUser(userId);
    setFollowing(res.followingMaping);
  };

  useEffect(() => {
    fetchFollow();
    fetchFollowers()
  }, [userId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await getUserDetail();
      setCurrentUser_id(res.user.id);
    };
    fetchCurrentUser();
  },[]);

  const getStatus = async () => {
    const res = await getFollowers(userId);
    console.log("get followers", res);
    const status = Array.isArray(res.followingMaping)
      ? res.followingMaping.some(
          (item: any) =>
            item.isFollow === true && item.user_id === currentUser_id
        )
      : false;
    setIsFollow(status);
  };

  useEffect(() => {
    getStatus();
  }, [userId, currentUser_id]);

  const handleSelectedFeed = (f: GetFeedProps) => {
    console.log("fffff", f, user);

    setSelectedFeed(f);
    setPostingOverview(!postingOverview);
  };

  return (
    <>
      <AppLayout
        classname={`${
          !loading ? "justify-between items-center" : "justify-between"
        }`}>
        {!loading ? (
          <>
            <FaSpinner size={23} className="animate-spin" />
            <div></div>
          </>
        ) : (
          <>
            <div>
              <UserDetailHeader
                fetchFollowing={fetchFollow}
                getStatus={getStatus}
                isFollow={isFollow}
                setIsFollow={setIsFollow}
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

              <div className="grid grid-cols-3 grid-rows-3  gap-3 mt-[63px]">
                {feed.map((f: GetFeedProps) => (
                  <div
                    key={f.id}
                    className="w-[325px] h-[325px] overflow-hidden cursor-pointer"
                    onClick={() => handleSelectedFeed(f)}>
                    <UserDetailFeed image={f.image} />
                  </div>
                ))}
              </div>
            </div>
            <div></div>

            {postingOverview && selectedFeed && (
              <PostingOverview
                profileImage={user.image}
                getFeed={getFeeds}
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

export default UserDetail;
