import NotificationList from "./NotificationList";
import { IoNotificationsOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getNotif } from "../../services/NotifApi";
import { socket } from "../../socket/socket.ts";
import { getToken } from "../../services/userApi";
import { jwtDecode } from "jwt-decode";
import type { appLayoutProps } from "../../pages/layout/type";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<any>([]);
  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const decode = jwtDecode(token) as appLayoutProps;
      setUser_id(decode.id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
  if (user_id) {
    socket.emit("join_user", user_id);
  }
}, [user_id]);

  useEffect(() => {
    const fetchNotif = async () => {
      const res = await getNotif();
      setNotification(res);
    };
    fetchNotif();

    socket.on("new_notification", (newNotif: any) => {
      setNotification((prev : any) => [newNotif, ...prev]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <>
      <div className="flex justify-end relative mt-10 mb-10 top-10">
        <div
          className="bg-[#dde7ff] hover:bg-[#cddcfd] border-[#d0deff] border p-2 rounded-full relative cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
          <IoNotificationsOutline size={32} color="#3971FF" />
          {notification.length > 0 &&
            notification.some((n: any) => n.isRead === false) && (
              <>
                <div className="bg-red-700 w-[9px] h-[9px] rounded-full absolute top-3 animate-ping right-[13px]"></div>
                <div className="bg-red-700 w-[9px] h-[9px] rounded-full absolute top-3 right-[13px]"></div>
              </>
            )}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-lg p-5 rounded-xl absolute top-12 z-[100] max-h-[600px] overflow-y-scroll thin-scrollbar shadow-xl/5 transition-all duration-200 transform"
              onMouseEnter={() => setIsOpen(true)}>
              {/* <h1 className="text-[25px] mt-3 font-medium text-[#101010]">Notification</h1> */}
              <div className="flex flex-col  gap-2">
                {notification.length > 0 ? (
                  notification.map((notif: any) => (
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
                      ) : notif.type === "comment like" ? (
                             <NotificationList
                          notif_id={notif.id}
                          user_id={notif.actor.id}
                          actorImage={notif.actor.image}
                          imageFeed={notif.feed?.image}
                          username={notif.actor.username}>
                          like your comment
                        </NotificationList>
                      ) : ""}
                    </>
                  ))
                ) : (
                  <>
                    <span className="text-gray-800 text-center text-md">
                     No notifications yet <br/> go explore and make something happen!
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Notification;
