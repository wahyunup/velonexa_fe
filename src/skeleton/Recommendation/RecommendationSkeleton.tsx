const RecomendationSkeleton = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-[13px]">
          <a className="h-[37px] w-[37px] rounded-full overflow-hidden bg-gray-200 animate-pulse">
            <div className="object-cover w-full h-full" />
          </a>
          <div className="flex flex-col gap-1 justify-center">
            <a className="text-[13px] font-medium flex items-center gap-1 h-3 bg-gray-200 w-30 animate-pulse"></a>
            <a className="text-[11px] h-3 bg-gray-200 font-normal w-20  animate-pulse"></a>
          </div>
          <div className="bg-gray-200 h-5 w-20 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default RecomendationSkeleton;
