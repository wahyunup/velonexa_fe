import axios from "axios";

export const getToken = async () => {
 try {
      const res = await axios.get("https://velonexa-be.vercel.app/token", {
        withCredentials: true,
      });
        return res.data.accessToken;
    } catch (error: any) {

      if (error.response.data && error.response.data === 401) {
        const retry = await axios.get("https://velonexa-be.vercel.app/token", {
        withCredentials: true,
      });
      return retry.data.accessToken
      }
      console.log(error.response.data);
    }
}

export const getAllUser = async () => {
  try {
    const res = await axios.get("https://velonexa-be.vercel.app/users", {
      withCredentials : true
    })
    return res.data.data
  } catch (error:any) {
    console.log(error.response.data);
  }
}

export const getUserDetail = async () => {
  try {
    const res = await axios.get("https://velonexa-be.vercel.app/user", {
      withCredentials : true
    })
    return res.data
  } catch (error:any) {
    console.log(error.response.data);
  }
}

export const editUser = async (data:any) => {
  try {
    const res = await axios.patch("https://velonexa-be.vercel.app/user/edit", data, {
      withCredentials : true,
    })
    console.log("edit user", res.data);
    return res.data
  } catch (error:any) {
    throw error
  }
}

export const detailUser = async (id:Number) => {
  try {
    const res = await axios.get(`https://velonexa-be.vercel.app/user-detail/${id}`)
    return res.data
  } catch (error) {
  throw error    
  }
}

export const uploadPhotoUser = async (file:any) => {
  try {
    const res = await axios.patch(`https://velonexa-be.vercel.app/user/upload-image`, file , {
      withCredentials : true
    })
    return res.data
  } catch (error) {
  throw error    
  }
}
