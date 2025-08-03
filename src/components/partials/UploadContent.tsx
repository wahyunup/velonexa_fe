import { IoClose } from "react-icons/io5";
import { createFeed } from "../../services/FeedApi";
import { useEffect, useState } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const UploadContent = ({
  onclick,
  username,
  profileImage,
}: {
  onclick: () => void;
  username: string;
  profileImage: string;
}) => {
  const [form, setForm] = useState({
    address: "",
    description: "",
  });
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", form.description);
      formData.append("address", form.address);

      if (!form.address || !form.description || !file) {
        toast.error("semuanya harus diisi");
        return setIsLoading(false);
      }

      setIsLoading(true);
      await createFeed(formData);
      location.reload();
    } catch (error) {
      console.log("gagal submit");
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center bg-black/20 backdrop-blur-xs items-center">
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white flex flex-col gap-5 p-[15px] w-[950px] rounded-2xl">
        <div className="flex justify-between">
          <span className="flex justify-end"></span>
          <span className="text-center text-[22px] font-medium text-[#CFCFCF]">
            Create New Post
          </span>
          <span onClick={onclick} className="flex justify-end cursor-pointer">
            <IoClose color="red" size={30} />
          </span>
        </div>

        <div className="flex gap-[37px]">
          {/* upload gambar */}
          <div className="overflow-hidden rounded-2xl h-[492px] w-[50%] flex justify-center items-center ">
            {!file ? (
              <input
                id="file-upload"
                type="file"
                name="image"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}

            {!file && (
              <label
                htmlFor="file-upload"
                className="text-[#D3D3D3] rounded-2xl border-2 border-[#DCDCDC] border-dashed w-[60%] h-[70%] flex justify-center items-center underline flex-col gap-5">
                <HiOutlinePhoto size={50} color="#D3D3D3" /> upload image
              </label>
            )}
          </div>

          <div className="flex flex-col gap-[25px] w-[50%]">
            {/* user header scope */}
            <div className="flex items-center gap-[10px]">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden">
                <img className="object-cover w-full h-full" src={profileImage} alt="" />
              </div>
              <span className="text-[19px]">{username}</span>
            </div>

            {/* text area scope */}
            <div className="flex items-end flex-col h-full">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="outline-none w-full resize-none h-full placeholder:text-[20px] placeholder:text-[#ACABAB]"
                placeholder="Write a caption . . ."
              />
              <span className="text-[20px] text-[#ACABAB]">
                {form.description.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Add Location"
            className="outline-none placeholder:text-[20px] placeholder:text-[#ABABAB]"
          />
          {isLoading ? (
            <button className="bg-[#3971FF] py-[15px] text-white flex justify-center rounded-xl">
              <FaSpinner size={23} className="animate-spin" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#3971FF] py-[15px] text-white rounded-xl">
              Upload
            </button>
          )}
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UploadContent;
