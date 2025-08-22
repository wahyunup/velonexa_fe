const SearchResultSkeleton = () => {
    return (
        <>
        <div
                  className="flex gap-3 items-center  rounded-full p-2"
                  >
                  <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-100 animate-pulse">
                    <div
                      className=" object-cover w-full h-full bg-gray-100  animate-pulse"
                    />
                  </div>
                  <span className="h-3 w-40 bg-gray-100 animate-pulse"></span>
                </div>
        </>
    )
}

export default SearchResultSkeleton