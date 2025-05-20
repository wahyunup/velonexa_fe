import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
const Input = ({
  placeholder,
  type,
  children,
  name,
  value,
  onchange
}: {
  placeholder: string;
  name: string;
  value: string;
  type: any;
  onchange: any
  children: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleIsVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const isPassword = type === "password";
  const inputType = isPassword && isVisible ? "text" : type;

  return (
    <div className="border border-[#DEDDDD] rounded-lg h-[68px] px-[31px] flex items-center gap-[13px]">
      {children}
      <input
        className="h-full w-full focus:outline-0 text-[21px] font-normal placeholder:text-[#BEBEBE]"
        placeholder={placeholder}
        type={inputType}
        name={name}
        value={value}
        onChange={onchange}
        required
      />
      {isPassword && (
        isVisible ? (
          <IoEyeOutline onClick={handleIsVisible} size={22} color="#BEBEBE" className="cursor-pointer" />
        ) : (
          <IoEyeOffOutline onClick={handleIsVisible} size={22} color="#BEBEBE" className="cursor-pointer" />
        )
      )}
    </div>
  );
};

export default Input;
