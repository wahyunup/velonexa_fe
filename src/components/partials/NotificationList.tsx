import { useEffect, useState } from "react";
import { getNotif, updateNotif } from "../../services/NotifApi";

const NotificationList = ({
  actorImage,
  username,
  children,
  imageFeed,
  user_id,
  notif_id
}: {
  actorImage: string;
  username: string;
  children: React.ReactNode;
  imageFeed: string;
  user_id : number,
  notif_id : number
}) => {
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    const fetchNotifStatus = async () => {
      try {
        const res = await getNotif();
        const thisNotif = res.find((notif: any) => notif.id === notif_id);     
        setNotification(thisNotif.isRead);
      } catch (err) {
        console.error("Error fetching notif status", err);
      }
    };

    fetchNotifStatus();
  }, [notif_id]);

  const handleisRead = async () => {
      const res = await updateNotif(notif_id)
      console.log("dari isRead",res.readNotif.isRead);
      setNotification(res.readNotif.isRead)
    }
    
  return (
    <>
      <div className={`flex py-[10px] px-[15px] justify-between  hover:bg-gray-50 rounded-xl ${!notification ? "bg-[#f7faff]" : null}`}>
        <a href={`/userdetail/${user_id}`} onClick={handleisRead} className="flex items-center">
          <div className="w-[27px] h-[27px] rounded-full overflow-hidden">
            <img className="w-full h-full" src={actorImage} alt="" />
          </div>
          <div>
            <p className="text-[15px] text-[#101010]">
              <span className="font-semibold ml-[10px]">{username}</span> {children}
            </p>
          </div>
        </a>

        <div className="w-[55px] h-[55px] overflow-hidden rounded-[6px]">
          {imageFeed && <img className="h-full w-full" src={imageFeed} />}
        </div>
      </div>
    </>
  );
};

export default NotificationList;
