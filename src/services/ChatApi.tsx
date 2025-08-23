import axios from "axios";

export const getChat = async () => {
  try {
    const res = await axios.get("https://velonexa-be.vercel.app/chats", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getChatCurrentUser = async (target_id: number) => {
    try {
        const res = await axios.get(`https://velonexa-be.vercel.app/chat/${target_id}`, {
            withCredentials : true
        })

        return res.data

    } catch (error) {
        console.log(error);
        throw error
    }
}

export const createNewChat = async (message:string, target_id:number) => {
  try {
    const res = await axios.post(`https://velonexa-be.vercel.app/chat/${target_id}`, { message } , {
      withCredentials:true
    })
    console.log("create chat", res);
  } catch (error) {
    throw error
  }
}
 