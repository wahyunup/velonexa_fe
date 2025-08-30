import React from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setUseForm({ ...useForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://velonexa-be.vercel.app/users/login",
        useForm,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.msg, {
        onClose: () => navigate("/"),
      });
      setIsLoading(false);
    } catch (error: any) {
      toast.warning(error.response?.data?.msg || "Internal server error");
      setIsLoading(false);
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
        <div className="flex justify-center bg-white h-screen px-5 md:w-[50%] items-center">
          <form
            onSubmit={handleLogin}
            className=" w-[591px] flex flex-col md:gap-[41px] gap-7">
            <div className="flex flex-col md:gap-[68px] gap-[40px]">
              <div className="flex flex-col gap-[11px]">
                <h1 className="md:text-[37px] text-3xl font-semibold">
                  Log in to your Account
                </h1>
                <p className="md:text-[18px] font-medium">
                  welcome back!, select method to login
                </p>
              </div>

              <div className="flex flex-col md:gap-[23px] gap-4">
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
              disabled={isLoading}
              className={`${isLoading ? "bg-[#a6bfff]" : "bg-gradient-to-b from-[#3971FF] to-[#184dd3] hover:bg-gradient-to-t"} p-[10px] text-white rounded-xl w-full h-[68px] md:text-[25px] text-xl font-medium cursor-pointer border-1 border-blue-500 flex justify-center items-center`}>
              {isLoading ? (
                <>
                <img className='w-8 h-8 animate-ping absolute' src="/logo/logo-velonexa.png" alt="" />
                <img className='w-8 h-8' src="/logo/logo-velonexa.png" alt="" />
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-center text-sm md:text-lg">
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

        <div className="md:w-[50%] hidden md:inline h-screen overflow-hidden">
          <img
            className="bg-cover w-full h-full"
            src="/background/sosmed-banner.jpg"
            alt="banner"
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PartialLogin;
