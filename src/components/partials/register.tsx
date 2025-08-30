import { IoKeyOutline } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import Input from "../ui/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const RegisterPartial = ({
  classname,
}: {
  classname: string;
}) => {
  const [useForm, setUseForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false)

  const handleChange = (e: any) => {
    setUseForm({ ...useForm, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      setIsloading(true)
      const res = await axios.post("https://velonexa-be.vercel.app/users", useForm);
      toast.success(res.data.msg, {
        onClose : () => navigate("/auth/login")
      });
      setIsloading(false)
    } catch (error: any) {
      toast.warning(error.response?.data?.msg || "Internal Server Error");
    }
  };

   const getToken = async () => {
    try {
      const res = await axios.get("https://velonexa-be.vercel.app/token", {
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
        <div className="w-[50%] hidden md:inline h-screen overflow-hidden">
          <img
            className="bg-cover w-full h-full"
            src="/background/sosmed-banner.jpg"
            alt=""
          />
        </div>

        <div className="flex justify-center md:w-[50%] bg-white px-5 h-screen w-full items-center">
          <form onSubmit={handleRegister} className=" w-[591px] flex flex-col md:gap-[41px] gap-5">
            <div className="flex flex-col md:gap-[68px] gap-[40px]">
              <div className="flex flex-col gap-[11px]">
                <h1 className="md:text-[37px] text-2xl font-semibold">
                  Register to your Account
                </h1>
                <p className="md:text-[18px] text-[15px] font-medium">
                  Welcome!, Select method to register
                </p>
              </div>

              <div className="flex flex-col md:gap-[23px] gap-4">
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  onchange={handleChange}
                  value={useForm.username}>
                  <PiUser size={22} color="#BEBEBE" />
                </Input>
                <Input
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onchange={handleChange}
                  value={useForm.email}>
                  <TfiEmail size={22} color="#BEBEBE" />
                </Input>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onchange={handleChange}
                  value={useForm.password}>
                  <IoKeyOutline size={22} color="#BEBEBE" />
                </Input>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onchange={handleChange}
                  value={useForm.confirmPassword}>
                  <IoKeyOutline size={22} color="#BEBEBE" />
                </Input>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? "bg-[#a6bfff]" : "bg-gradient-to-b from-[#3971FF] to-[#184dd3] hover:bg-gradient-to-t"} p-[10px] text-white rounded-xl w-full h-[68px] md:text-[25px] text-xl font-medium cursor-pointer border-1 border-blue-500 flex justify-center items-center text`}>
              {isLoading ? (
                <>
                <img className='w-8 h-8 animate-ping absolute' src="/logo/logo-velonexa.png" alt="" />
                <img className='w-8 h-8' src="/logo/logo-velonexa.png" alt="" />
                </>
              ) : (
                "Register"
              )}
            </button>
            <p className="text-center md:text-lg text-sm">
              have account?{" "}
              <span
                onClick={()=>navigate("/auth/login")}
                className="text-[#3971FF] cursor-pointer">
                {" "}
                Log in
              </span>
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPartial;
