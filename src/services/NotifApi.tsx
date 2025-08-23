import axios from "axios";

export const createNotification = async (data: any) => {
  try {
    const res = await axios.post("https://velonexa-be.vercel.app/notification", data, {
      withCredentials: true,
    });
    console.log("notification output ===>",res.data)
    return res.data
  } catch (error:any) {
    console.log("create notification galat/error", error.response.data.msg);
  }
};

export const getNotif = async () => {
  try {
    const res = await axios.get("https://velonexa-be.vercel.app/notifications",{
        withCredentials: true
    })
    return res.data
  } catch (error) {
    throw error    
  }
}

export const updateNotif = async (id:number) => {
  try {
    const res = await axios.patch(`https://velonexa-be.vercel.app/notification/${id}/read-notif`,{},{
        withCredentials: true
    })
    return res.data
  } catch (error) {
    throw error    
  }
}
 