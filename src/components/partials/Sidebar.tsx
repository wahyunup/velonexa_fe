import Button from "../ui/Button";
import SidebarNav from "../ui/SidebarNav";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoCompassOutline } from "react-icons/io5";
import { PiFilmReelLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../services/userApi";
import type { appLayoutProps } from "../../pages/layout/type";
import { MdVerified } from "react-icons/md";
import { getNotif } from "../../services/NotifApi";

const Sidebar = () => {
  const [notification, setNotification] = useState([]);
    const [data, setData] = useState({
    displayname: "",
    username: "",
    image: ""
  });
  const navigate = useNavigate();

const isRead = notification.some((notif) => {
    return notif.isRead
  })
  
  
    useEffect(() => {
      const fetchNotif = async () => {
        const res = await getNotif();
        setNotification(res);
      };
      fetchNotif();
    }, []);

  const logOut = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:3001/users/logout",
        null,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.msg);
      return toast.success(res.data?.msg, {
        onClose: () => navigate("/auth/login"),
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const decode = jwtDecode(token) as appLayoutProps;
      setData({ displayname: decode.displayname, username: decode.username,image:decode.image });
      console.log("dapet ===>", decode);
    };

    fetchUser();
  }, []);

    return (
        <>
        <div className="w-[372px] p-[15px] flex flex-col h-screen justify-between bg-white border border-r-[#ECECEC] sticky top-0">
        <div>
          <div className="flex flex-col items-center border-b border-b-[#f1f1f1] py-10">
 
            <a className="w-[143px] h-[143px] overflow-hidden rounded-full outline-[#3971FF] outline-4" href="/curentuserdetail">
              <img
              className="object-cover w-full h-full"
                src={data?.image}
                alt=""
                />
            </a>

            <span className="text-center text-[19px] pt-[13px] flex items-center gap-1 justify-center">
              {data?.displayname} 
              <MdVerified className=" right-0 bottom-10" color="#3971FF"/>
            </span>
            <span className="text-center text-[15px] text-[#A5A5A5]">
              @{data?.username}
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-10">
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
          classname="bg-[#E55757] text-white py-[10px]  text-[15px] rounded-md cursor-pointer w-full"
          onClick={logOut}>
          LogOut
        </Button>
      </div>
        </>
    )
}

export default Sidebar