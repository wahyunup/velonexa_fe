const UserDetailSkeleton = () => {
  return (
    <>
      <div className=" w-full 2xl:flex 2xl:justify-center">
        <div className="2xl:w-[1000px] px-10">
          <div className="sticky top-0 bg-[#FCFCFC]">
            <div className="flex gap-[37px] pt-20 px-10 ">
              <div className="flex flex-col items-center gap-[18px]">
                <div className="w-[131px] h-[131px] rounded-full overflow-hidden bg-gray-200 animate-pulse">
                  <div className="object-cover w-full h-full" />
                </div>
              </div>

              <div className="flex gap-[20px] flex-col ">
                <div className="flex gap-4 items-center">
                  <div className="flex gap-[2px] flex-col">
                    <h1 className="text-[24px] font-medium flex items-center gap-1 bg-gray-200 w-20 h-3 animate-pulse"></h1>
                    <span className="text-[16px] text-[#A5A5A5] w-14 h-3 bg-gray-200 animate-pulse"></span>
                  </div>
                  <div className="flex gap-2">
                    <button className="h-7 w-7 bg-gray-200 animate-pulse"></button>
                    <button className="h-7 w-7 bg-gray-200 animate-pulse"></button>
                  </div>
                </div>
                <div className="flex gap-[50px]">
                  <span className="text-[19px] w-20 h-3 bg-gray-200 animate-pulse"></span>
                  <span className="text-[19px] w-20 h-3 bg-gray-200 animate-pulse"></span>
                  <span className="text-[19px] w-20 h-3 bg-gray-200 animate-pulse"></span>
                </div>

                <div className=" w-[500px]">
                  <p className="text-[14px] text-justify bg-gray-200 w-60 h-3 animate-pulse"></p>
                </div>
              </div>
            </div>
            <div className="bg-[#ECECEC] h-[1px] w-full mt-[48px]"></div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-[63px]">
            {Array.from({length:6}).map(() => ( 
            <div className="  aspect-square overflow-hidden cursor-pointer bg-gray-200 animate-pulse">
              <div className="object-cover h-full w-full" />
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailSkeleton;
