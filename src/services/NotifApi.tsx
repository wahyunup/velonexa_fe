import axios from "axios";

export const createNotification = async (data: any) => {
  try {
    const res = await axios.post("http://localhost:3001/notification", data, {
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
    const res = await axios.get("http://localhost:3001/notifications",{
        withCredentials: true
    })
    return res.data
  } catch (error) {
    throw error    
  }
}

export const updateNotif = async (id:number) => {
  try {
    const res = await axios.patch(`http://localhost:3001/notification/${id}/read-notif`,{},{
        withCredentials: true
    })
    return res.data
  } catch (error) {
    throw error    
  }
}
 