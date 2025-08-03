import AppLayout from "../layout/AppLayout";
import SearchPartial from "../../components/partials/Search";
import { useEffect, useState } from "react";
import { getAllUser } from "../../services/userApi";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  console.log(
    "test maping",
    searchResult.map((data) => {
      data;
    })
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getAllUser();
      setUsers(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const results = users.filter((user: any) => {
        return user.username.includes(search);
      });
      setSearchResult(results);
    } else {
      setSearchResult([]);
    }
  }, [search, users]);

  return (
    <AppLayout classname="">
      <div className="flex flex-col m-10 w-[900px]">
        <SearchPartial search={search} setSearch={setSearch} />
        <div className="flex flex-col mt-5 gap-1">
          {searchResult.map((user: any) => (
            <a
              className="flex gap-3 items-center hover:bg-gray-100 rounded-full p-2"
              href={`/userdetail/${user.id}`}>
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img src={user.image} className=" object-cover w-full h-full" alt="" />
                </div>
              <span>@{user.username}</span>
            </a>
          ))}
        </div>
      </div>

      {/* tagline */}
      <div className="mt-10 w-[25%]">
        <h1 className="text-[27px] font-medium mb-7">Tagline</h1>
        <div className="flex gap-2 flex-wrap">
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #diluar
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #digidaw
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
          <span className="bg-[#f8f8f8] p-2 rounded-lg text-[15px] border-1 border-[#ececec] text-gray-700">
            #test
          </span>
        </div>
      </div>
    </AppLayout>
  );
};

export default Search;
