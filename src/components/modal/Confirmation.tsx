import { AnimatePresence, motion } from "framer-motion";

const ConfirmationModal = ({
  handleFalse,
  handleTrue,
  heading,
  subheading,
  lableTrue,
}: {
  handleFalse: () => void;
  handleTrue: () => void;
  heading: string;
  subheading: string;
  lableTrue: string;
}) => {
  return (
    <>
      <div className="bg-black/60 backdrop-blur-sm fixed inset-0 flex justify-center items-center z-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white px-8 py-10 flex items-center gap-4 flex-col rounded-3xl w-sm">
            <h1 className="font-semibold text-2xl">{heading}</h1>
            <p className="text-center text-sm text-gray-600">{subheading}</p>
            <div className="flex gap-2 w-full mt-3">
              <button
                onClick={handleFalse}
                className="cursor-pointer bg-white border hover:bg-[#ffeeee] border-gray-500 hover:border-[#E55757] hover:text-[#E55757] text-black font-medium w-full h-12 rounded-2xl text-sm">
                Cancle
              </button>
              <button
                onClick={handleTrue}
                className="cursor-pointer hover:bg-[#c54c4c] bg-[#E55757] text-white font-medium w-full h-12 rounded-2xl text-sm">
                {lableTrue}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ConfirmationModal;
