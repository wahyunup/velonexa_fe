import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import type { user } from "../ui";

const ListUser = ({
  handleFalse,
  allUser,
}: {
  handleFalse: () => void;
  allUser: user[];
}) => {

  const [hover, setHover] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken();
      const decode = jwtDecode(res)
      setCurrentUser(decode)
    };
    fetchToken();
  }, []);

 const filteredAllUser = currentUser 
  ? allUser.filter((user:any) => user.id !== currentUser.id)
  : allUser;
  
  return (
    <>
      <div className="bg-black/50 backdrop-blur-sm inset-0 fixed flex items-center justify-center">
        <div className="bg-white px-8 py-9 rounded-2xl relative w-150 ">
          <button
            onClick={handleFalse}
            className="cursor-pointer absolute top-5 right-5">
            <RxCross2 size={20} />
          </button>

          <div className="flex flex-col gap-2 items-center thin-scrollbar overflow-y-scroll mt-10 h-100">
            {filteredAllUser.map((user:any) => (
              <div className="flex justify-between w-full items-center hover:bg-gray-50 p-3 rounded-2xl">
                <div className="flex gap-3 items-center">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      className="w-full h-full object-cover"
                      src={user.image}
                      alt=""
                    />
                  </div>
                  <h1 className="text-sm">{user.username}</h1>
                </div>

                <button
                onClick={() => navigate(`/userdetail/${user.id}`)}
                  onMouseEnter={() => setHover(user.id)}
                  onMouseLeave={() => setHover(true)}
                  className="cursor-pointer h-fit p-[10px] text-[#3971FF] hover:outline hover:outline-[#3971FF] bg-[#ebf1ff] rounded-xl flex items-center gap-1 text-[14px]">
                  <AnimatePresence mode="wait">
                    {hover === user.id && (
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -10, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}>
                        message
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <IoChatbubbleEllipsesOutline size={25} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default ListUser;
