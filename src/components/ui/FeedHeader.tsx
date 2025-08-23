import type { FeedheaderProps, MyJwtPayload } from "../ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { MdReport } from "react-icons/md";
import { getToken } from "../../services/userApi";
import { jwtDecode} from "jwt-decode";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteFeed } from "../../services/FeedApi";
import { toast, ToastContainer } from "react-toastify";
import ConfirmationModal from "../modal/Confirmation";

const Feedheader = ({
  username,
  datePosting,
  address,
  id,
  image,
  feed_id,
  handlingReport
}: FeedheaderProps) => {

  dayjs.extend(relativeTime);
  const dateTime = datePosting;
  const date = dayjs(dateTime).fromNow();
  const [isOpen, setIsOpen] = useState(false);
  const [successCopy, setsuccessCopy] = useState(false);
  const [user, setUser] = useState<MyJwtPayload>();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalReport, setIsOpenModalReport] = useState(false)
  // console.log("debug",user.id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getToken();
      const decode = jwtDecode<MyJwtPayload>(res);
      setUser(decode);
    };
    fetchUser();
  }, []);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    setsuccessCopy(false);
  };

  const handleSetSuccessCopy = () => {
    setsuccessCopy(true);
  };

  const handleDeleteFeed = async () => {
      const deleted = await deleteFeed(feed_id)   
      setIsOpen(false)
      setIsOpenModalDelete(false)
      toast.success(deleted.msg, {
        onClose : () => location.reload()
      })
  }

  return (
    <>
    <div className="flex justify-between items-center relative">
      {isOpen &&
        ( user && id === user?.id ? (
          <div className="bg-white flex flex-col p-[12px] absolute right-0 top-12 rounded-lg gap-2">
            <button onClick={() => setIsOpenModalDelete(true)} className="px-[50px] py-[7px] bg-red-100 hover:bg-red-400 hover:text-white text-red-400 text-[14px] rounded-lg cursor-pointer flex items-center gap-1 ">
              <FaRegTrashAlt size={17} />
              Delete
            </button>
            <button
              className={`px-[50px] py-[7px] bg-[#FAFAFA] text-[14px] rounded-lg cursor-pointer flex items-center justify-center gap-1 text-[#000]`}>
              Edit post
            </button>
            <button
              className={`px-[50px] py-[7px] bg-[#FAFAFA] text-[14px] rounded-lg cursor-pointer flex items-center justify-center gap-1 text-[#000] ${
                successCopy ? "bg-green-400 text-white" : ""
              }`}
              onClick={handleSetSuccessCopy}>
              {successCopy ? "Success" : "Copy link"}
            </button>
          </div>
        ) : (
          <div className="bg-white flex flex-col p-[12px] absolute right-0 top-12 rounded-lg gap-2">
            <button onClick={() => setIsOpenModalReport(true)} className="px-[50px] py-[7px] bg-red-100 hover:bg-red-400 hover:text-white text-red-400 text-[14px] rounded-lg cursor-pointer flex items-center gap-1 ">
              <MdReport size={17} />
              Report
            </button>
            <button
              className={`px-[50px] py-[7px] bg-[#FAFAFA] text-[14px] rounded-lg cursor-pointer flex items-center justify-center gap-1 text-[#000] ${
                successCopy ? "bg-green-400 text-white" : ""
              }`}
              onClick={handleSetSuccessCopy}>
              {successCopy ? "Success" : "Copy Link"}
            </button>
          </div>
        ))}
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
      <ToastContainer/>

       {isOpenModalDelete && (
        <ConfirmationModal
        heading="Remove This Post?"
        subheading="This feed will be gone forever. Think twice before deleting it."
        lableTrue="Delete"
        handleFalse={() => {setIsOpenModalDelete(false), setIsOpen(false)}}
        handleTrue={handleDeleteFeed}
        />
      )}

       {isOpenModalReport && (
        <ConfirmationModal
        heading="Report This Post?"
        subheading="We’ll take a look at this feed and check if it violates our guidelines."
        lableTrue="REPORT"
        handleFalse={() => {setIsOpenModalReport(false), setIsOpen(false)}}
        handleTrue={() => {handlingReport(feed_id), setIsOpenModalReport(false), setIsOpen(false)}}
        />
      )}
</>
  );
};

export default Feedheader;
