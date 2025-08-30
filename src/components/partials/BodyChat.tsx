import type { ChatProps } from "../../pages/type";
import type { BodyChatProps } from "../ui";

const BodyChat = ({ bodyChat, user, isLoading }: BodyChatProps) => {
  return (
    <div className="flex flex-col gap-3 p-5 h-full ">
      {isLoading ? (
         Array.from({length:6}).map((_,i) => {
          const isMe = i % 2 === 0;
          return (
            <div
              key={i}
              className={`${isMe ? "flex justify-end" : "flex justify-start"}`}
            >
              <div
                className={`relative max-w-[70%] px-4 py-2 rounded-2xl text-sm h-8 w-30 animate-pulse
                  ${isMe ? "bg-gray-100 rounded-tr-sm " : "bg-gray-100 rounded-tl-sm"}
                  before:content-[''] before:absolute before:bottom-2
                  before:border-8 before:border-transparent
                  ${
                    isMe
                      ? "before:right-[-6px] before:border-l-gray-100"
                      : "before:left-[-6px] before:border-r-gray-100"
                  }
                `}
              >
                
              </div>
            </div>
          );
         })
      ) : (
        bodyChat.map((chat: ChatProps) => {
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
        })
      )}
    </div>
  );
};

export default BodyChat;
