import { useEffect, useState } from "react";
import { detailUser, getToken, getUserDetail } from "../../services/userApi";
import AppLayout from "../layout/AppLayout";
import UserDetailHeader from "../../components/partials/UserDetailHeader";
import UserDetailFeed from "../../components/partials/UserDetailFeed";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { GetFeedProps, MyJwtPayload } from "../../components/ui";
import PostingOverview from "../../components/partials/PostingOverview";
import { getFeeds } from "../../services/FeedApi";
import {
  getFollowers,
  getFollowersUser,
} from "../../services/followApi";
import UserDetailSkeleton from "../../skeleton/CurrentUserDetails/UserDetailSkeleton";
import { getBookmark } from "../../services/bookmarkApi";
import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";
import { IoImage, IoImageOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoBookmarkSlash } from "react-icons/go";
import { CiImageOff } from "react-icons/ci";

const UserDetail = () => {
  const [user, setUser] = useState({
    id: 0,
    username: "",
    displayname: "",
    bio: "",
    email: "",
    image: "",
  });
  const [userLogin, setUserLogin] = useState<MyJwtPayload>();

  // console.log("user ===>", user);

  const [feed, setFeed] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<GetFeedProps | null>(null);
  const [postingOverview, setPostingOverview] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [currentUser_id, setCurrentUser_id] = useState(0);
  const [isActive, setIsActive] = useState("post");
  const navigate = useNavigate();

  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken();
      if(!res) {
        navigate("auth/login")
        setUserLogin({email:"",
          id:0,
          username:""
        })
      }
      const decode = jwtDecode<MyJwtPayload>(res);
      setUserLogin(decode);
    };
    fetchUser();
  });

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
    fetchFollowers();
  }, [userId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await getUserDetail();
      setCurrentUser_id(res.user.id);
    };
    fetchCurrentUser();
  }, []);

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
        classname={`${!loading ? "justify-between" : ""}`}>
        {!loading ? (
          <>
            {/* <FaSpinner size={23} className="animate-spin" /> */}
            <UserDetailSkeleton />
          </>
        ) : (
          <>
            <div className=" w-full flex justify-center">
              <div className="2xl:w-[1000px] px-10">
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
                    className={`cursor-pointer flex gap-2 items-center ${
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

                <div className="grid grid-cols-3 gap-3 mt-[63px] mb-[20px] md:px-[150px] 2xl:px-[0px]">
                  {isActive === "post" ? (
                    <>
                      {
                      feed.length > 0 ? (

                        feed.map((f: GetFeedProps) => (
                          <div
                          key={f.id}
                          className=" aspect-square overflow-hidden cursor-pointer"
                          onClick={() => handleSelectedFeed(f)}>
                          <UserDetailFeed image={f.image} />
                        </div>
                      ))
                    ) : (
                    <>
                    <div></div>
                          <div className="flex flex-col items-center gap-5">
                            <CiImageOff size={40}/>
                            <h1 className="text-[21px] font-medium text-center ">No feed Posts Yet</h1>
                            <p className=" text-center text-[16px]">
                             Create posts to easily find them again later.
                            </p>
                          </div>
                          <div></div>
                    </>
                    )
                      
                      }
                    </>
                  ) : isActive === "saved" ? (
                    <>
                      {bookmark.length > 0 ? (
                        user.id === userLogin?.id ? (
                          bookmark.map((b: GetFeedProps) => (
                            <div
                              key={b.id}
                              className=" aspect-square overflow-hidden cursor-pointer"
                              onClick={() => handleSelectedFeed(b.feed)}>
                              <UserDetailFeed image={b.feed.image} />
                            </div>
                          ))
                        ) : (
                          <>
                            <div></div>
                            <div className="flex flex-col items-center gap-5 h-[500px]">
                              <IoLockClosedOutline size={40} />
                              <h1 className="text-[21px] font-medium text-center ">
                                This user's feed bookmark are private
                              </h1>
                              <p className=" text-center text-[16px]">
                                Feed bookmark by{" "}
                                <span className="text-[#3971FF]">
                                  {user.username}
                                </span>{" "}
                                are currently hidden
                              </p>
                            </div>
                            <div></div>
                          </>
                        )
                      ) : (
                        <>
                          <div></div>
                          <div className="flex flex-col items-center gap-5">
                            <GoBookmarkSlash size={40}/>
                            <h1 className="text-[21px] font-medium text-center ">No Saved Posts Yet</h1>
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
              <PostingOverview
                handlingReport={() => selectedFeed.id}
                profileImage={
                  isActive === "saved" ? selectedFeed?.user?.image : user.image
                }
                getFeed={getFeeds}
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

export default UserDetail;
