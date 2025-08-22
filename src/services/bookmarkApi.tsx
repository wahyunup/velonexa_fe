import axios from "axios";

export const getBookmark = async (user_id:number) => {
  try {
    const res = await axios.get(`http://localhost:3001/bookmark/${user_id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBookmark = async (feed_id:number) => {
  try {
    const res = await axios.post(`http://localhost:3001/bookmark-feed/${feed_id}`,{}, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};