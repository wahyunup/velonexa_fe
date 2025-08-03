import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import { getNotif } from "../../services/NotifApi";
import NotificationList from "../../components/partials/NotificationList";

const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchNotif = async () => {
      const res = await getNotif();
      setNotification(res);
    };
    fetchNotif();
  }, []);

  return (
    <AppLayout classname="flex">
      <div className="flex flex-col pl-[41px] pt-[72px] w-[400px]">
        <h1 className="text-[27px] font-medium">Notification</h1>
        <div className="flex flex-col mt-[38px] gap-2">
          {notification.map((notif:any) => (
            <>
              {notif.type === "like" ? (
                <NotificationList
                  notif_id={notif.id}
                  user_id={notif.actor.id}
                  actorImage={notif.actor.image}
                  imageFeed={notif.feed?.image}
                  username={notif.actor.username}>
                  like your post
                </NotificationList>
              ) : notif.type === "comment" ? (
                <NotificationList
                  notif_id={notif.id}
                  user_id={notif.actor.id}
                  actorImage={notif.actor.image}
                  imageFeed={notif.feed?.image}
                  username={notif.actor.username}>
                  comment your post
                </NotificationList>
              ) : notif.type === "follow" ? (
                <NotificationList
                  notif_id={notif.id}
                  user_id={notif.actor.id}
                  actorImage={notif.actor.image}
                  imageFeed={notif.feed?.image}
                  username={notif.actor.username}>
                  Following you
                </NotificationList>
              ) : (
                ""
              )}
            </>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notification;
