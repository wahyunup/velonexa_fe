import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import Feed from "../../components/partials/Feed";
import Interaction from "../../components/partials/Interaction";
import { jwtDecode } from "jwt-decode";
import type { appLayoutProps } from "../layout/type";
import { getToken } from "../../services/userApi";
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationList from "../../components/partials/NotificationList";
import { getNotif } from "../../services/NotifApi";

const Home = () => {


  const [data, setData] = useState({
    username: "",
    profileImage: "",
  });
 

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const decode = jwtDecode(token) as appLayoutProps;
      setData({ username: decode.username, profileImage: decode.image });
    };

    fetchUser();
  }, []);
  return (
    <div>
      <ToastContainer />

      <AppLayout classname="flex ">
        <div className="flex justify-around w-full">
          <div></div>
          {/* postingan */}
          <div>
            <Feed />
          </div>

          {/* interaction */}
          <div>
            <Interaction
              profileImage={data.profileImage}
              username={data.username}
            />
          </div>
        </div>
      </AppLayout>
    </div>
  );
};

export default Home;
