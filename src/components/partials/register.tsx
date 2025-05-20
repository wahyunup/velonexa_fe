import { IoKeyOutline } from "react-icons/io5";
import { PiUser } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import Input from "../ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const RegisterPartial = ({
  navigate,
  classname,
}: {
  navigate: () => void;
  classname: string;
}) => {
  const [useForm, setUseForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigated = useNavigate();

  const handleChange = (e: any) => {
    setUseForm({ ...useForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3001/users", useForm);
      toast.success(res.data.msg, {
        onClose : () => navigated("/auth/login")
      });
    } catch (error: any) {
      toast.warning(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <>
      <div className={classname}>
        <div className="w-full h-screen">
          <img
            className="bg-cover w-full"
            src="/src/assets/banner.jpg"
            alt=""
          />
        </div>

        <div className="flex justify-center w-full items-center">
          <div className=" w-[591px] flex flex-col gap-[41px]">
            <div className="flex flex-col gap-[68px]">
              <div className="flex flex-col gap-[11px]">
                <h1 className="text-[37px] font-semibold">
                  Register to your Account
                </h1>
                <p className="text-[18px] font-medium">
                  Welcome!, Select method to register
                </p>
              </div>

              <div className="flex flex-col gap-[23px]">
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
              onClick={handleSubmit}
              className="bg-[#3971FF] p-[10px] text-white rounded-xl w-full h-[68px] text-[25px] font-medium">
              Register
            </button>
            <p className="text-center">
              have account?{" "}
              <span
                onClick={navigate}
                className="text-[#3971FF] cursor-pointer">
                {" "}
                Log in
              </span>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPartial;
