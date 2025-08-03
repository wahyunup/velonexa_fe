import RecomUser from "../ui/RecomUser";
import { getAllUser } from "../../services/userApi";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const RecomFoll = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <h1 className="text-[24px] font-medium">Recomendation</h1>

      <div
        className={`flex ${
          !loading
            ? "justify-center items-center h-[200px]"
            : " flex-col gap-[24px]"
        }`}>
        {!loading ? (
          <FaSpinner size={23} className="animate-spin" />
        ) : (
          <>
            {users.map((user: any) => (
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
