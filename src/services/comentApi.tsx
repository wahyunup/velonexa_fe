import axios from "axios";

export const getComment = async (id: number) => {
  try {
    const res = await axios.get(`https://velonexa-be.vercel.app/comments/feed/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createComment = async (id: number, content: any) => {
  try {
    const res = await axios.post(
      `https://velonexa-be.vercel.app/comments/feed/${id}`,
      { content },
      { withCredentials: true }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createCommentLike = async (feedId: number, likeId: number) => {
  try {
    const res = await axios.post(
      `https://velonexa-be.vercel.app/comments/feed/${feedId}/like/${likeId}`, {},
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCommentLikeStatus = async (feedId: number, likeId: number) => {
  try {
    const res = await axios.get(
      `https://velonexa-be.vercel.app/comments/feed/${feedId}/like/${likeId}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
