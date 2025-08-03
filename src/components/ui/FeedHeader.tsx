import type { FeedheaderProps } from "../ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { MdReport } from "react-icons/md";

const Feedheader = ({
  username,
  datePosting,
  address,
  id,
  image
}: FeedheaderProps) => {
  dayjs.extend(relativeTime);
  const dateTime = datePosting;
  const date = dayjs(dateTime).fromNow();
  const [isOpen, setIsOpen] = useState(false)
  const [successCopy, setsuccessCopy] = useState(false)

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
    setsuccessCopy(false)
  }

  const handleSetSuccessCopy = () => {
    setsuccessCopy(true)
  }

  return (
    <div className="flex justify-between items-center relative">
      {isOpen && (
        <div className="bg-white flex flex-col p-[12px] absolute right-0 top-12 rounded-lg gap-2">
          <button className="px-[50px] py-[7px] bg-red-100 hover:bg-red-400 hover:text-white text-red-400 text-[14px] rounded-lg cursor-pointer flex items-center gap-1 "><MdReport size={17}/>Report</button>
          <button className={`px-[50px] py-[7px] bg-[#FAFAFA] text-[14px] rounded-lg cursor-pointer flex items-center justify-center gap-1 text-[#868686] ${successCopy ? "bg-green-400 text-white" : ""}`} onClick={handleSetSuccessCopy}>{successCopy ? "Success" : "Copy Link"}</button>
        </div> 
      )}
      <div className="flex gap-[15px]">
        <a href={`/userdetail/${id}`}>
          <img
            className="w-[49px] h-[49px] rounded-full object-cover"
            src={image}
            alt=""
          />
        </a>
        <div className="flex-col flex">
          <div className="flex gap-1 items-center">
            <a href={`/userdetail/${id}`} className="text-[16px]">
              {username}
            </a>
            <span className="text-[11px] text-[#BABABA]">.</span>
            <span className="text-[11px] text-[#BABABA]">{date}</span>
          </div>
          <span className="text-[12px] text-[#5F5F5F]">{address}</span>
        </div>
      </div>
      <div
        className="flex flex-col gap-1 cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-full"
        onClick={handleIsOpen}>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <span className="w-1 h-1 rounded-full bg-black"></span>
        <span className="w-1 h-1 rounded-full bg-black"></span>
      </div>
    </div>
  );
};

export default Feedheader;
