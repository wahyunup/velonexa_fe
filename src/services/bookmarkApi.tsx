import axios from "axios";

export const getBookmark = async (user_id:number) => {
  try {
    const res = await axios.get(`https://velonexa-be.vercel.app/bookmark/${user_id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBookmark = async (feed_id:number) => {
  try {
    const res = await axios.post(`https://velonexa-be.vercel.app/bookmark-feed/${feed_id}`,{}, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};