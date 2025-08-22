const FeedSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-20 mt-24 w-[500px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex gap-[15px]">
            <a>
              <div className="w-[49px] h-[49px] rounded-full object-cover bg-gray-100 animate-pulse" />
            </a>
            <div className="flex-col flex gap-1">
              <div className="flex gap-1 items-center">
                <a className="text-[16px] h-3.5 animate-pulse w-40 bg-gray-100"></a>
                <span className="text-[11px] text-[#BABABA]">.</span>
                <span className="text-[11px] text-[#BABABA] h-3.5 animate-pulse bg-gray-100 w-10"></span>
              </div>
              <span className="text-[12px] text-[#5F5F5F] h-3.5 animate-pulse bg-gray-100 w-20"></span>
            </div>
          </div>
          <div className="w-full h-[415px] rounded-2xl overflow-hidden">
            <div className="object-cover h-full w-full bg-gray-100 animate-pulse" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-[16px] h-3 bg-gray-100 animate-pulse"></span>
            <p className="font-normal text-[15px] break-words w-[430px] h-3 bg-gray-100 animate-pulse"></p>
          </div>
          {/* <FeedComment
          
          /> */}
        </div>
      </div>
    </>
  );
};

export default FeedSkeleton;
