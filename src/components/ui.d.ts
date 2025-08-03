import type { ReactNode } from "react"

export interface ButtonProps {
    onClick : () => void
    children : ReactNode
    classname : string
}

export interface SidebarNavProps {
    children : ReactNode
    href : string
    icon : ReactNode
    isRead? : boolean
}

export interface FeedheaderProps{
    username: string,
    datePosting : string,
    address: string
    image: string
    id : number
}

export interface user {
    username : string
    image : string

}

export interface GetFeedProps {
    createdAt : string
    address : string
    description : string
    image : string
    user : user
    like_count : number
    id : number
    user_id: number
    username: string
    postingOverview : () => void
    handleSelectedFeed : () => void
}

export interface FeedDescProps {
    username : string,
    description : string
}

export interface InteracFeedProps {
    user_id : number
    likeCount : number,
    isOpen : boolean,
    feedId: number,
    refreshFeed: () =>  void
}

export interface InteracFeedCurentProps {
    likeCount : number,
    isOpen : boolean,
    feedId: number,
}

export interface UserDetailHeaderProps {
    userId : number,
    username : string,
    displayname : string,
    bio : string,
    postCount : ReactNode,
    followingCount : ReactNode,
    followerCount : ReactNode,
    email : string
    image : string
    isFollow : any,
    setIsFollow : any
    getStatus : any
    fetchFollowing : () => void
}

export interface CommentListProps {
    username : string,
    field_comment : string,
    image : string,
    createdAt : number,
    feedId : number,
    commentId : number
}