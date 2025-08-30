import { useEffect, useState } from "react";
import type { SidebarNavProps } from "../ui";
import { useLocation, useNavigate } from "react-router-dom";
import { getNotif } from "../../services/NotifApi";

const SidebarNav = ({ children, href, icon, isRead }: SidebarNavProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotif = async () => {
      const res = await getNotif();
      setNotification(res);
    };
    fetchNotif();
  }, []);

  return (
    <button onClick={ href ? () => navigate(href) : undefined}>
      <div
        className={` cursor-pointer flex items-center justify-between gap-[15px] 2xl:px-[20px] 2xl:py-[12px] lg:px-[14px] lg:py-[10px] border border-[#fff] rounded-xl text-[#ABABAB] ${
          isActive
            ? "bg-[#F8F8F8] border-[#F0F0F0] text-black font-medium"
            : "hover:bg-[#F8F8F8] border-[#F0F0F0] hover:text-[#ABABAB]"
        }`}>
        <div className="flex items-center justify-center gap-[15px]">
          <span>{icon}</span>
          {children}
        </div>
        {isRead === false && notification.length > 0 ? (
          <span className="bg-red-600 w-[9px] h-[9px] animate-pulse text-[12px] rounded-full text-white"></span>
        ) : null}
      </div>
    </button>
  );
};

export default SidebarNav;
