import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const SearchPartial = ({
  setSearch,
  search,
}: {
  setSearch: (value: string) => void;
  search: string;
}) => {
  return (
    <>
      <div className=" flex flex-col gap-5">
        <span className="text-[27px] font-medium">search</span>
        <div className="bg-[#FCFCFC] border flex items-center outline-[#F0F0F0] border-[#F0F0F0] h-[52px] rounded-xl px-[20px]">
          <input
            className="placeholder:italic placeholder:text-[#BDBDBD] w-full  h-full  rounded-xl outline-none"
            placeholder="Search"
            type="text"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
          />

          {search !== "" ? (
            <RxCross2
              size={22}
              color="#BDBDBD"
              className="cursor-pointer"
              onClick={() => setSearch("")}
            />
          ) : (
            <IoIosSearch size={22} color="#BDBDBD" />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPartial;
