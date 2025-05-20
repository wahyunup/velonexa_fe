import { IoKeyOutline } from "react-icons/io5"
import { PiUser } from "react-icons/pi"
import Input from "../ui/input"
import { useState } from "react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PartialLogin = ({navigate, classname}:{navigate:() => void, classname:string }) => {
    const [useForm, setUseForm] = useState({
        email: "",
        password: "",
      });
        const navigated = useNavigate();

      const handleChange = (e:any) => {
        setUseForm({...useForm, [e.target.name]: e.target.value})
      }

      const handleLogin = async () => {
          try {
          const res = await axios.post("http://localhost:3001/users/login", useForm, {
            withCredentials : true
          })
          
          console.log("dapet dari login",res);
          
          toast.success(res.data.msg, {
            onClose: () => navigated("/")
          });
          } catch (error:any) {
            toast.warning(error.response?.data?.msg)
          }
        } 


    return (
        <>
        <div className={classname} >
        <div className="flex justify-center w-full items-center">
          <div className=" w-[591px] flex flex-col gap-[41px]">
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
               <Input name="email" onchange={handleChange} value={useForm.email} placeholder="email" type="email"><PiUser size={22} color="#BEBEBE"/></Input>
               <Input name="password" onchange={handleChange} value={useForm.password} placeholder="Password" type="password"><IoKeyOutline size={22} color="#BEBEBE"/></Input>
              </div>
            </div>

            <button onClick={handleLogin} className="bg-[#3971FF] p-[10px] text-white rounded-xl w-full h-[68px] text-[25px] font-medium">
              Login
            </button>
          <p className="text-center">Dont have account? <span onClick={navigate} className="text-[#3971FF] cursor-pointer"> Create an account</span></p>
          </div>
        </div>

        <div className="w-full h-screen">
          <img
            className="bg-cover w-full"
            src="/src/assets/banner.jpg"
            alt=""
          />
        </div>
<ToastContainer/>
      </div>
        </>
    )
}

export default PartialLogin