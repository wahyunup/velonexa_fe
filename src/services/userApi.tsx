import axios from "axios";

export const getToken = async () => {
 try {
      const res = await axios.get("http://localhost:3001/token", {
        withCredentials: true,
      });
        return res.data.accessToken;
    } catch (error: any) {

      if (error.response.data && error.response.data === 401) {
        const retry = await axios.get("http://localhost:3001/token", {
        withCredentials: true,
      });
      return retry.data.accessToken
      }
      console.log(error.response.data);
    }
}

export const getAllUser = async () => {
  try {
    const res = await axios.get("http://localhost:3001/users", {
      withCredentials : true
    })
    return res.data.data
  } catch (error:any) {
    console.log(error.response.data);
  }
}

export const getUserDetail = async () => {
  try {
    const res = await axios.get("http://localhost:3001/user", {
      withCredentials : true
    })
    return res.data
  } catch (error:any) {
    console.log(error.response.data);
  }
}

export const editUser = async (data:any) => {
  try {
    const res = await axios.patch("http://localhost:3001/user/edit", data, {
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
    const res = await axios.get(`http://localhost:3001/user-detail/${id}`)
    return res.data
  } catch (error) {
  throw error    
  }
}

export const uploadPhotoUser = async (file:any) => {
  try {
    const res = await axios.patch(`http://localhost:3001/user/upload-image`, file , {
      withCredentials : true
    })
    return res.data
  } catch (error) {
  throw error    
  }
}
