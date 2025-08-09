export interface userChatListProps { 
    id: number,
    username : string,
    image : string,
    lastMessage : string
    onclick : () => void
}

export interface ChatProps {
    id: number,
    actor_id : number,
    message : string    
} 

export interface UserProps {
    id: number
}