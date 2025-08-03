import axios from "axios";

export const getFollows = async () => {
    try {
        const res = await axios.get(`http://localhost:3001/follows`,{
            withCredentials : true
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getFollowers = async (id:number) => {
    try {
        const res = await axios.get(`http://localhost:3001/follows/${id}`,{
            withCredentials : true
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getFollowersUser = async (id:number) => {
    try {
        const res = await axios.get(`http://localhost:3001/follower/${id}`,{
            withCredentials : true
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const Follow = async (id:number) => {
    try {
        const res = await axios.post(`http://localhost:3001/follow/${id}`,{},{
            withCredentials : true
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const unfollow = async (id:number) => {
    try {
        const res = await axios.delete(`http://localhost:3001/unfollow/${id}`,{
            withCredentials : true
        })
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}