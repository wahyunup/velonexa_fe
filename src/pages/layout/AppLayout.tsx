import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/partials/Sidebar";
import { getToken } from "../../services/userApi";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const AppLayout = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname: string;
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const cekToken = async () => {
      const token = await getToken();
      if (!token) {
        navigate("/auth/login");
      }
    };

    cekToken();
  }, [navigate]);

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
