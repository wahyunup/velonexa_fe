import RecomUser from "../ui/RecomUser";
import { getAllUser, getToken } from "../../services/userApi";
import { useEffect, useState } from "react";
import RecomendationSkeleton from "../../skeleton/Recommendation/RecommendationSkeleton";
import { jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RecomFoll = () => {
  const [users, setUsers] = useState([]);
  const [currentUser_id, setCurrentUser_id] = useState(0)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const res = await getToken()
      if (!res) {
        navigate("/auth/login");
        setCurrentUser_id(0)
      }
      const decode = jwtDecode<any>(res)
      setCurrentUser_id(decode.id)
    }
    fetchToken()
  },[])

  const usersFillter = users.filter((user:{id:number}) => user.id !== currentUser_id)
  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getAllUser();
      setUsers(res);
      setLoading(true);
    };

    fetchUser();
  }, []);

  

  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="2xl:text-[24px] lg:text-[20px] font-medium">Recomendation</h1>

      <div
        className={`flex ${
          !loading
            ? "justify-center items-center px-1"
            : " flex-col gap-[24px] h-[240px]  overflow-hidden hover:overflow-y-scroll thin-scrollbar stable-scrollbar px-1 duration-200 transition-all"
        }`}>
        {!loading ? (
          // <FaSpinner size={23} className="animate-spin" />
          <div className="flex flex-col gap-[24px]">
{
          Array.from({length: 4}).map(() => (

            <RecomendationSkeleton/>
          ))}
          </div>

          
        ) : (
          <>
            {usersFillter.map((user: any) => (
              <RecomUser
                id={user.id}
                image={user.image}
                username={user.username}
                displayname={user.display_name}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RecomFoll;
