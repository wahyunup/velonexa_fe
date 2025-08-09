import { IoKeyOutline } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PartialLogin = ({ classname }: { classname: string }) => {
  const [useForm, setUseForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUseForm({ ...useForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post( "http://localhost:3001/users/login", useForm,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.msg, {
        onClose: () => navigate("/"),
      });
    } catch (error: any) {
      toast.warning(error.response?.data?.msg || "Internal server error");
    }
  };

  const getToken = async () => {
    try {
      const res = await axios.get("http://localhost:3001/token", {
        withCredentials: true,
      });
      console.log("dari token", res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const cekToken = async () => {
      const token = await getToken();
      if (token) {
        navigate("/");
      }
    };
    cekToken();
  }, [navigate]);

  return (
    <>
      <div className={classname}>
        
        <div className="flex justify-center bg-white h-screen w-[50%] items-center">
          <form onSubmit={handleLogin} className=" w-[591px] flex flex-col gap-[41px] ">
            <div className="flex flex-col gap-[68px]">
              <div className="flex flex-col gap-[11px]">
                <h1 className="text-[37px] font-semibold">
                  Log in to your Account
                </h1>
                <p className="text-[18px] font-medium">
                  welcome back!, select method to login
                </p>
              </div>

              <div className="flex flex-col gap-[23px]">
                <Input
                  name="email"
                  onchange={handleChange}
                  value={useForm.email}
                  placeholder="email"
                  type="email">
                  <PiUser size={22} color="#BEBEBE" />
                </Input>
                <Input
                  name="password"
                  onchange={handleChange}
                  value={useForm.password}
                  placeholder="Password"
                  type="password">
                  <IoKeyOutline size={22} color="#BEBEBE" />
                </Input>
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-b from-[#3971FF] to-[#184dd3] hover:bg-gradient-to-t p-[10px] text-white rounded-xl w-full h-[68px] text-[25px] font-medium cursor-pointer ">
              Login
            </button>
            <p className="text-center">
              Dont have account?{" "}
              <span
                onClick={() => navigate("/auth/register")}
                className="text-[#3971FF] cursor-pointer">
                {" "}
                Create an account
              </span>
            </p>
          </form>
        </div>

        <div className="w-[50%] h-screen overflow-hidden">
          <img
            className="bg-cover w-full h-full"
            src="/src/assets/banner.jpg"
            alt=""
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PartialLogin;
