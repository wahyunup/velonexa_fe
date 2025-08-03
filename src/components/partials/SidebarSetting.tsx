import { useLocation } from "react-router-dom";

const SidebarSetting = () => {
      const location = useLocation();
    const isActive = (path:any) => location.pathname === path;

      const menuItems = [
    { path: "/setting/profile", label: "Profile" },
    { path: "/setting/account", label: "Account" },
    { path: "/setting/block", label: "Block" },
    { path: "/setting/appearance", label: "Appearance" },
    { path: "/setting/language", label: "Language" },
    { path: "/setting/support", label: "Support" },
  ];
  return (
    <div className="bg-[#F8F8F8] outline-1 px-6 outline-[#EFEFEF] w-[249px] rounded-4xl mb-[56px]">
      <div className="flex flex-col gap-3 mt-[128px]">
        {menuItems.map((path) => (
          <a href={path.path} className={`w-full py-[14px] rounded-xl   text-start px-[20px] ${ !isActive(path.path) ? "text-[#ABABAB]" : "text-[#5484FF] outline-1 outline-[#A7C0FF] bg-[#EFF4FF]" }`}>
          {path.label}
        </a>
        ))}
       
      </div>
    </div>
  );
};

export default SidebarSetting;
