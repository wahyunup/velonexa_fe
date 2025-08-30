import Sidebar from "../../components/partials/Sidebar";
import { ToastContainer } from "react-toastify";

const AppLayout = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname: string;
}) => {

// bg-[#FCFCFC]
  return (
    <>
      <div className={`${classname} bg-[#FCFCFC] flex`}>
        {/* sidebar */}
        <Sidebar />
        {children}
       
      </div>
      <ToastContainer />
    </>
  );
};

export default AppLayout;
