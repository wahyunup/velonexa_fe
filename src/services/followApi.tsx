import axios from "axios";

export const getFollows = async () => {
    try {
        const res = await axios.get(`https://velonexa-be.vercel.app/follows`,{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getFollowers = async (id:number) => {
    try {
        const res = await axios.get(`https://velonexa-be.vercel.app/follows/${id}`,{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getFollowersUser = async (id:number) => {
    try {
        const res = await axios.get(`https://velonexa-be.vercel.app/follower/${id}`,{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const Follow = async (id:number) => {
    try {
        const res = await axios.post(`https://velonexa-be.vercel.app/follow/${id}`,{},{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const unfollow = async (id:number) => {
    try {
        const res = await axios.delete(`https://velonexa-be.vercel.app/unfollow/${id}`,{
            withCredentials : true
        })
        return res.data
    } catch (error) {
        console.log(error);
        throw error
    }
}