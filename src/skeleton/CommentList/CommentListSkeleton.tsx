const CommentListSkeleton = () => {
  return (
    <>
      <div className="py-[12px] even:bg-gray-50 rounded-2xl p-5">
        <div className="py-[10px] flex gap-[13px] items-center">
          <div className="2xl:w-[37px] 2xl:h-[37px] lg:w-[32px] lg:h-[32px] overflow-hidden rounded-full bg-gray-200 animate-pulse">
            <div className="object-cover h-full w-full "></div>
          </div>
          <span className="2xl:text-sm lg:text-sm font-medium animate-pulse h-3 w-20 bg-gray-200"></span>
        </div>

        <div className="flex flex-col gap-[9px]">
          <div className="flex justify-between">
            <p className="2xl:text-[14px] lg:text-[13px] text-[#535353] cursor-pointer w-20 h-2 bg-gray-200 animate-pulse">
              
            </p>


            <div className="cursor-pointer w-2 h-2 bg-gray-200 animate-pulse rounded-full"></div>
          </div>

          <div className="flex justify-between px-[17px]">
            <span className="text-[11px] font-medium text-[#ccc] h-2 w-16 bg-gray-200 animate-pulse"></span>

            <div className="text-[#535353] 2xl:text-[14px] lg:text-[12px] font-medium cursor-pointer bg-gray-200 h-2.5 w-14 animate-pulse">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentListSkeleton;
