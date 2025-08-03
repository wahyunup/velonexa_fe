import type { FeedDescProps } from "../ui"

const FeedDesc = ({username, description}:FeedDescProps) => {
    return (
        <div className="flex flex-col">
        <span className="font-medium text-[16px]">{username}</span>
        <p className="font-normal text-[15px] break-words w-[430px]">{description}</p>
        </div>
    )
}

export default FeedDesc