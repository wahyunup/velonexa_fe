import type { ReactNode } from "react";

export interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  classname: string;
}

export interface SidebarNavProps {
  children?: ReactNode;
  href?: string;
  icon: ReactNode;
  isRead?: boolean;
}

export interface FeedheaderProps {
  username: string;
  datePosting: string;
  address: string;
  image: string;
  id: number;
  feed_id : number
  handlingReport : (feed_id:number) => void
}

export interface user {
  username: string;
  image: string;
}

export interface GetFeedProps {
  createdAt: string;
  address: string;
  description: string;
  image: string;
  user: user;
  like_count: number;
  id: number;
  user_id: number;
  username: string;
  feed: any
  postingOverview: () => void;
  handleSelectedFeed: () => void;
}

export interface FeedDescProps {
  username: string;
  description: string;
}

export interface InteracFeedProps {
  user_id: number;
  likeCount: number;
  isOpen: boolean;
  feedId: number;
  refreshFeed: () => void;
}

export interface InteracFeedCurentProps {
  likeCount: number;
  isOpen: boolean;
  feedId: number;
}

export interface UserDetailHeaderProps {
  userId: number;
  username: string;
  displayname: string;
  bio: string;
  postCount: ReactNode;
  followingCount: ReactNode;
  followerCount: ReactNode;
  email: string;
  image: string;
  isFollow?: any;
  setIsFollow?: any;
  getStatus?: any;
  fetchFollowing?: () => Promise<void>;
}

export interface CommentListProps {
  user_id: number;
  username: string;
  field_comment: string;
  image: string;
  createdAt: number;
  feedId: number;
  commentId: number;
}

export interface InputChatProps {
  handleSendChat: (e) => void;
  user: any;
  setChatValue: any;
  chatValue: any;
  isLoadingSendComment : boolean
}

export interface BodyChatProps {
  user: any;
  bodyChat: any;
  isLoading: boolean
}

export interface CommentProps {
  id: number;
  user: { id : number,image: string; username: string };
  likes: { createdAt: number };
  field_comment: string;
}

  export interface MyJwtPayload {
    id: number,
    email : string,
    username : string
  }
