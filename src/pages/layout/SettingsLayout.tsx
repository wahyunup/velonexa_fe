import SidebarSetting from "../../components/partials/SidebarSetting";
import AppLayout from "./AppLayout";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppLayout classname="">
      <div className="flex ml-[25px] mt-[80px] gap-[25px] justify-between">
        <SidebarSetting />
        {children}
      </div>
    </AppLayout>
  );
};

export default SettingsLayout;
