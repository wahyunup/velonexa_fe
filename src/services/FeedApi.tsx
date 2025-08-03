import axios from "axios";

export const createFeed = async (useForm: any) => {
  try {
    const res = await axios.post("http://localhost:3001/feed", useForm, {
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
    const res = await axios.get("http://localhost:3001/feeds-explore")
    return res.data
  } catch (error) {
    throw error    
  }
}
 