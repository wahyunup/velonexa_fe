import Button from "../ui/Button";
import SidebarNav from "../ui/SidebarNav";
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoCompassOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../services/userApi";
import type { appLayoutProps } from "../../pages/layout/type";
import { MdVerified } from "react-icons/md";
import ConfirmationModal from "../modal/Confirmation";
import { FaPowerOff } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import UploadContent from "./UploadContent";

const Sidebar = () => {
  const [data, setData] = useState({
    displayname: "",
    username: "",
    image: "",
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPosting, setIsOpenPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    try {
      const res = await axios.patch(
        "https://velonexa-be.vercel.app/users/logout",
        null,
        {
          withCredentials: true,
        }
      );
      setIsOpen(false);
      console.log(res.data.msg);
      return toast.success(res.data?.msg, {
        onClose: () => navigate("/auth/login"),
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(false);
      const token = await getToken();
      if (!token) {
        navigate("/auth/login");
        setData({displayname:"",
          image:"",
          username:""
        })
      }
      const decode = jwtDecode(token) as appLayoutProps;
      setData({
        displayname: decode.displayname,
        username: decode.username,
        image: decode.image,
      });
      setIsLoading(true);
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* w-[372px] */}

      {/* sizebar large size */}
      <div className=" p-[15px] 2xl:flex lg:hidden hidden flex-col h-screen justify-between bg-white border border-r-[#ECECEC] sticky top-0">
        <div>
          <div className="flex flex-col items-center border-b border-b-[#f1f1f1] py-10">
            {!isLoading ? (
              <>
                <div className="2xl:w-[143px] 2xl:h-[143px] lg:w-[110px] lg:h-[110px] bg-gray-100 rounded-full animate-pulse"></div>
                <div className="bg-gray-100 mt-[13px] 2xl:h-3 2xl:w-25 lg:h-2 lg:w-20  animate-pulse"></div>
                <div className="bg-gray-100 mt-[10px] 2xl:h-3 2xl:w-30 lg:h-2 lg:w-25 animate-pulse"></div>
              </>
            ) : (
              <>
                <a
                  className="2xl:w-[143px] 2xl:h-[143px] lg:w-[110px] lg:h-[110px] overflow-hidden rounded-full outline-[#3971FF] 2xl:outline-4 outline-3"
                  href="/curentuserdetail">
                  <img
                    className="object-cover w-full h-full"
                    src={data?.image || undefined}
                    alt="profile-image"
                  />
                </a>

                <span className="text-center 2xl:text-[19px] lg:text-[16px] pt-[13px] flex items-center gap-1 justify-center">
                  {data?.displayname}
                  <MdVerified className=" right-0 bottom-10" color="#3971FF" />
                </span>

                <span className="text-center 2xl:text-[15px] lg:text-[13px] text-[#A5A5A5]">
                  @{data?.username}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-10 2xl:w-[300px] lg:w-[250px]">
            <SidebarNav icon={<GoHome size={32} />} href="/">
              Home
            </SidebarNav>
            <SidebarNav icon={<IoSearchOutline size={32} />} href="/search">
              Search
            </SidebarNav>
            <SidebarNav icon={<AiOutlineMessage size={32} />} href="/message">
              Message
            </SidebarNav>
            <SidebarNav icon={<IoCompassOutline size={32} />} href="/explore">
              Explore
            </SidebarNav>
            {/* <SidebarNav
              isRead={isRead}
              icon={<IoNotificationsOutline size={32} />}
              href="/notification">
              Notification 
            </SidebarNav> */}
          </div>
        </div>

        <Button
          classname="bg-[#E55757] text-white py-[13px] text-[15px] rounded-xl cursor-pointer w-full"
          onClick={handleOpenModal}>
          <div className="flex items-center justify-center">
            <span>Logout</span>
            {/* <IoLogOutOutline size={32}/> */}
          </div>
        </Button>
      </div>

      {/*sidebar medium size */}
      <div className="2xl:hidden p-[15px] lg:flex hidden flex-col h-screen justify-between bg-white border border-r-[#ECECEC] sticky top-0">
        <div>
          <div className="flex flex-col items-center border-b border-b-[#f1f1f1] py-10">
            {!isLoading ? (
              <>
                <div className="2xl:w-[143px] 2xl:h-[143px] lg:w-[40px] lg:h-[40px] bg-gray-100 rounded-full animate-pulse"></div>
                {/* <div className="bg-gray-100 mt-[13px] 2xl:h-3 2xl:w-25 lg:h-2 lg:w-20  animate-pulse"></div>
                <div className="bg-gray-100 mt-[10px] 2xl:h-3 2xl:w-30 lg:h-2 lg:w-25 animate-pulse"></div> */}
              </>
            ) : (
              <>
                <a
                  className="2xl:w-[143px] 2xl:h-[143px] lg:w-[40px] lg:h-[40px] overflow-hidden rounded-full outline-[#3971FF] 2xl:outline-4 outline-2"
                  href="/curentuserdetail">
                  <img
                    className="object-cover w-full h-full"
                    src={data?.image || undefined}
                    alt="profile-image"
                  />
                </a>

                <span className="text-center 2xl:text-[19px] lg:text-[16px] pt-[13px] flex items-center gap-1 justify-center">
                  {/* {data?.displayname} */}
                  {/* <MdVerified className=" right-0 bottom-10" color="#3971FF" /> */}
                </span>

                <span className="text-center 2xl:text-[15px] lg:text-[13px] text-[#A5A5A5]">
                  {/* @{data?.username} */}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-10 2xl:w-full g:w-full">
            <SidebarNav icon={<GoHome size={32} />} href="/">
            </SidebarNav>
            <SidebarNav icon={<IoSearchOutline size={32} />} href="/search">
            </SidebarNav>
            <SidebarNav icon={<IoChatbubbleEllipsesOutline size={32} />} href="/message">
            </SidebarNav>
            <SidebarNav icon={<IoCompassOutline size={32} />} href="/explore">
            </SidebarNav>
            <SidebarNav icon={               
              <CiSquarePlus onClick={() => setIsOpenPosting(true)} size={32} />}>
            </SidebarNav>
       
            {/* <SidebarNav
              isRead={isRead}
              icon={<IoNotificationsOutline size={32} />}
              href="/notification">
              Notification 
            </SidebarNav> */}
          </div>
        </div>

        <Button
          classname="bg-[#E55757] text-white py-[18px] text-[15px] rounded-xl cursor-pointer w-full"
          onClick={handleOpenModal}>
          <div className="flex items-center text-center justify-center">
            {/* <span>Logout</span> */}
            <FaPowerOff size={17}/>

          </div>
        </Button>
      </div>

      {isOpen && (
        <ConfirmationModal
          heading="Leaving So Soon?"
          subheading="You’ll be signed out of your account. Don’t worry, you can log back in anytime."
          lableTrue="Logout"
          handleFalse={() => setIsOpen(false)}
          handleTrue={logOut}
        />
      )}

      {isOpenPosting ? <UploadContent profileImage={data.image} onclick={() => setIsOpenPosting(false)} username={data.username}/> : null}
    </>
  );
};

export default Sidebar;
