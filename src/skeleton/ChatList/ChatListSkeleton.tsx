const ChatListSkeleton = () => {
    return (
        <>
        <div
        className="flex px-[20px] py-[15px] bg-gray-50 rounded-2xl w-full h-[90px] justify-between items-center cursor-pointer">
        <div className="flex gap-[10px] items-center">
          <div className="w-[54px] h-[54px] bg-gray-200 animate-pulse rounded-full overflow-hidden">
            <div
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[240px] flex flex-col justify-center">
            <div className="flex flex-col gap-1">
              <span className="text-[#101010] text-sm h-[15px] w-40 bg-gray-200 animate-pulse"></span>
              <p className="text-[#8F8F8F] text-xs wrap-break-word h-[10px] w-20 bg-gray-200 overflow-hidden animate-pulse">
              </p>
            </div>
          </div>
        </div>

        <span className="w-[9px] h-[9px] bg-[#3971FF] rounded-full"></span>
      </div>
        </>
    )
}

export default ChatListSkeleton