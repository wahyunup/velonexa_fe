import axios from "axios";

export const createFeed = async (useForm: any) => {
  try {
    const res = await axios.post("https://velonexa-be.vercel.app/feed", useForm, {
      withCredentials: true,
    });
    console.log("hasil bikin feed",res.data)
    return res.data
  } catch (error:any) {
    console.log("gagal mendapatkan feed", error.response.data.msg);
  }
};

export const getFeeds = async () => {
  try {
    const res = await axios.get("https://velonexa-be.vercel.app/feeds-explore")
    return res.data
  } catch (error) {
    throw error    
  }
}

export const deleteFeed = async (feed_id:number) => {
  try {
    const res = await axios.delete(`https://velonexa-be.vercel.app/feed/${feed_id}`)
    return res.data
  } catch (error) {
    throw error    
  }
}
 