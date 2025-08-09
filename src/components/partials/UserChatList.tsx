import type { userChatListProps } from "../../pages/type";

const UserChatList = ({
  image,
  username,
  lastMessage,
  onclick,
}: userChatListProps) => {
  return (
    <>
      <div
        onClick={onclick}
        className="flex px-[20px] py-[15px] bg-gray-50 rounded-2xl w-full h-[90px] justify-between items-center cursor-pointer">
        <div className="flex gap-[10px] items-center">
          <div className="w-[54px] h-[54px] rounded-full overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={`${image}`}
              alt=""
            />
          </div>
          <div className="w-[240px] flex flex-col justify-center">
            <div className="">
              <span className="text-[#101010] text-sm">{username}</span>
              <p className="text-[#8F8F8F] text-xs wrap-break-word h-[20px] overflow-hidden">
                {lastMessage}
              </p>
            </div>
          </div>
        </div>

        <span className="w-[9px] h-[9px] bg-[#3971FF] rounded-full"></span>
      </div>
    </>
  );
};

export default UserChatList;
