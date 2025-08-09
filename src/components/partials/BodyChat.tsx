import type { ChatProps } from "../../pages/type";
import type { BodyChatProps } from "../ui";

const BodyChat = ({ bodyChat, user }: BodyChatProps) => {
  return (
    <div className=" flex flex-col gap-3 p-5 overflow-y-scroll thin-scrollbar h-[768px] ">
      {bodyChat.map((chat: ChatProps) => {
        const isMe = chat.actor_id === user?.id;
        return (
          <div
            key={chat.id}
            className={`${isMe ? "flex justify-end" : "flex justify-start"}`}
          >
            <div
              className={`relative w-fit max-w-[70%] px-4 py-2 rounded-2xl text-sm
                ${isMe ? "bg-sky-50 rounded-tr-sm" : "bg-gray-50 rounded-tl-sm"}
                before:content-[''] before:absolute before:bottom-2
                before:border-8 before:border-transparent
                ${
                  isMe
                    ? "before:right-[-6px] before:border-l-sky-50"
                    : "before:left-[-6px] before:border-r-gray-50"
                }
              `}
            >
              {chat.message}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BodyChat;
