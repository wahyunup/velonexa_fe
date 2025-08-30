import { GoPlus } from "react-icons/go";
import UploadContent from "../partials/UploadContent";
import { useState } from "react";

const ButtonPost = ({username, profileImage}:{username:string, profileImage : string}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  };
  return (
    <div>
      <button onClick={handleIsOpen} className="2xl:w-full 2xl:h-[258px] lg:w-full lg:h-[230px] bg-white rounded-2xl  border-[#DCDCDC] lg:hidden 2xl:flex justify-center items-center flex-col border-dashed border-2 cursor-pointer">
        <GoPlus size={97} color="#E9E9E9" />
        <span className="text-[13px] text-[#D3D3D3]">media</span>
      </button>

      {isOpen ? <UploadContent profileImage={profileImage} onclick={handleIsOpen} username={username}/> : null}
    </div>
  );
};

export default ButtonPost;
