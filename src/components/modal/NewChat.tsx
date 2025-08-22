import { AnimatePresence, motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const NewChatModal = ({
  username,
  handleTrue,
  handleFalse,
  image,
  value,
  setChatValue
}: {
  username: string;
  handleTrue: (e: React.FormEvent) => void;
  handleFalse: () => void;
  setChatValue: (value:string) => void
  image: string
  value: string
}) => {
  return (
    <>
      <div
        className="bg-black/60 backdrop-blur-sm fixed inset-0 flex justify-center items-center z-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white px-8 py-10 flex items-center gap-4 flex-col rounded-3xl w-sm relative">
            <div className="flex flex-col items-center gap-4">
                <button onClick={handleFalse} className="cursor-pointer justify-end flex w-full absolute right-8 top-9"><RxCross2 size={20}/></button>
              <div className="w-20 h-20 overflow-hidden rounded-full">
                <img src={image} alt="" className="w-full h-full object-cover"/>
              </div>
              <h1 className="font-semibold text-2xl text-center">
                Chat with <span className="text-[#3971FF]">{username}</span>
              </h1>
            </div>
            <p className="text-center text-sm text-gray-600">
              Say hi and let the conversation begin!{" "}
            </p>
            <div className="flex flex-col gap-4 w-full mt-3">
              <form onSubmit={handleTrue}>
                <input
                  onChange={(e) => setChatValue(e.target.value)}
                  placeholder={`hai ${username}`}
                  type="text"
                  value={value}
                  name=""
                  id=""
                  className="outline outline-gray-200 w-full duration-200 transition-all  h-40 rounded-2xl text-center focus:ring-2 focus:ring-[#3971FF]/50 focus:shadow-[0_0_5px_rgba(57,113,255,0.6),inset_0_0_5px_rgba(57,113,255,0.6)]"
                />
              </form>
              <button
                type="submit"
                onClick={handleTrue}
                className="cursor-pointer hover:bg-[#3365e2] bg-[#3971FF] text-white font-medium w-full h-12 rounded-2xl text-sm">
                Send Message
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default NewChatModal;
