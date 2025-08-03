import { useEffect, useState } from "react";
import SettingsLayout from "../../layout/SettingsLayout";
import {
  editUser,
  getUserDetail,
  uploadPhotoUser,
} from "../../../services/userApi";
import { toast, ToastContainer } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";

const Profile = () => {
  const [dataUser, setDataUser] = useState({
    username: "",
    display_name: "",
    bio: "",
    image: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleUploadPhoto = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const res = await uploadPhotoUser(formData);
      toast.success("Upload success", {
        onClose: () => location.reload(),
      });
      setDataUser((prev) => ({ ...prev, image: res.image }));
    } catch (error : any) {
      toast.error(error?.response?.data?.msg || "Upload failed");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserDetail();
        console.log("dapet dari setting =====>", res);

        setDataUser({
          bio: res.user.bio?.bio,
          display_name: res.user.display_name,
          username: res.user.username,
          image: res.user.image,
        });
      } catch (error: any) {
        console.log(error.response.data.msg);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: any) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    try {
      const res = await editUser(dataUser);
      toast.success(res.msg, {
        onClose: () => {
          location.reload();
        },
      });
    } catch (error: any) {
      const err = error.response?.data.msg || "internal server error";
      console.log("dapet dari error", err);
      toast.warning(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <SettingsLayout>
        <div className="flex-col flex  gap-[28px]">
          <div className="flex justify-between items-center w-[734px] bg-[#F8F8F8] outline-1 outline-[#EFEFEF] h-[189px] rounded-4xl px-[50px]">
            <div className="w-[111px] h-[111px] overflow-hidden rounded-full outline-3 outline-[#5484FF]">
              <img className="object-cover w-full h-full" src={dataUser.image} alt="" />
            </div>
            <button
              onClick={handleIsOpen}
              className="px-[16px] py-[11px] text-[#5484FF] outline-1 outline-[#A7C0FF] bg-[#EFF4FF] rounded-xl">
              Change Image
            </button>
          </div>

          <form
            onSubmit={handleEdit}
            className="w-[734px] px-[41px] py-[37px] bg-[#F8F8F8] outline-1 outline-[#EFEFEF] rounded-4xl">
            <div className="flex flex-col gap-[33px]">
              <div>
                <h1 className="text-[19px] font-medium">Profile</h1>
                <p className="text-[15px] text-[#999999]">
                  Update your account settings
                </p>
              </div>

              <div className="flex flex-col gap-[16px]">
                <input
                  onChange={handleChange}
                  name="bio"
                  value={dataUser.bio}
                  type="text"
                  placeholder="Bio"
                  className="placeholder:text-[#BDBDBD] bg-[#F5F5F5] outline outline-[#F0F0F0] h-[52px] px-[20px] rounded-xl"
                />
                <input
                  onChange={handleChange}
                  name="display_name"
                  value={dataUser.display_name}
                  type="text"
                  placeholder="Name"
                  className="placeholder:text-[#BDBDBD] bg-[#F5F5F5] outline outline-[#F0F0F0] h-[52px] px-[20px] rounded-xl"
                />
                <input
                  onChange={handleChange}
                  name="username"
                  value={dataUser.username}
                  type="text"
                  placeholder="Username"
                  className="placeholder:text-[#BDBDBD] bg-[#F5F5F5] outline outline-[#F0F0F0] h-[52px] px-[20px] rounded-xl"
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <button
              onClick={handleEdit}
              className="bg-[#EFF4FF] outline outline-[#3971FF] text-[#3971FF] w-[156px] h-[43px] rounded-xl">
              Update
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="flex justify-center items-center bg-black/20 backdrop-blur-xs fixed inset-0">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 1, scale: 1 }}
                className="p-6 bg-white ease-in-out flex flex-col gap-7 justify-between rounded-4xl z-10">
                {!file ? (
                  <>
                    <input
                      className="hidden"
                      type="file"
                      name=""
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files?.[0])}
                    />
                    <label
                      htmlFor="file-upload"
                      className="outline-2 w-[400px] h-[350px] outline-[#3971FF] flex justify-center items-center rounded-3xl outline-dashed">
                      upload file here
                    </label>
                  </>
                ) : (
                  <div className="w-[400px] h-[350px] overflow-hidden rounded-3xl">
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                  </div>
                )}
                <div className="flex flex-row-reverse gap-2 justify-between">
                  <button
                    onClick={handleUploadPhoto}
                    className="cursor-pointer bg-[#3971FF] text-white outline-1 p-2 w-[85%] rounded-2xl">
                    {!isLoading ? "upload image" : "loading..."}
                  </button>

                  <button
                    onClick={handleIsOpen}
                    className="cursor-pointer bg-red-400 text-red-900  p-2 w-[15%] rounded-2xl">
                    x
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </SettingsLayout>
    </>
  );
};

export default Profile;
