import { useEffect, useState } from "react";
import type { SidebarNavProps } from "../ui";
import { useLocation } from "react-router-dom";
import { getNotif } from "../../services/NotifApi";

const SidebarNav = ({ children, href, icon, isRead }: SidebarNavProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchNotif = async () => {
      const res = await getNotif();
      setNotification(res);
    };
    fetchNotif();
  }, []);

  return (
    <a href={href}>
      <div
        className={` flex items-center justify-between gap-[15px] px-[20px] py-[12px] border border-[#fff] rounded-lg text-[#ABABAB]  ${
          isActive
            ? "bg-[#F8F8F8] border-[#F0F0F0] text-black font-medium"
            : "hover:bg-[#F8F8F8] border-[#F0F0F0] hover:text-[#ABABAB]"
        }`}>
        <div className="flex items-center gap-[15px]">
          <span>{icon}</span>
          {children}
        </div>
        {isRead === false && notification.length > 0 ? (
          <span className="bg-red-600 w-[9px] h-[9px] animate-pulse text-[12px] rounded-full text-white"></span>
        ) : null}
      </div>
    </a>
  );
};

export default SidebarNav;
