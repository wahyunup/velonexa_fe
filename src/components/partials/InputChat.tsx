import { LuSend } from "react-icons/lu"
import type { InputChatProps } from "../ui"
import { SyncLoader } from "react-spinners"

const InputChat = ({handleSendChat, user, setChatValue, chatValue, isLoadingSendComment}:InputChatProps) => {
  
    return (
        <>
         <form
                onSubmit={handleSendChat}
                className="bg-white flex items-center p-5">
                <div className=" w-full rounded-full h-fit bg-gray-50 flex items-center gap-3 p-2 pr-5">
                  <div className="w-10 h-9 overflow-hidden rounded-full">
                    <img
                      src={user?.image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <input
                    onChange={(e) => setChatValue(e.target.value)}
                    value={chatValue}
                    type="text"
                    className="outline-0 w-full"
                  />
                {isLoadingSendComment ? (
          <SyncLoader
            size={8}
            margin={1}
            color="#3971FF"
            speedMultiplier={0.5}
          />
        ) : (
          <button type="submit" className="cursor-pointer">
            <LuSend size={20} color="#0047FF" />
          </button>
        )}
                </div>
              </form>
        </>
    )
}

export default InputChat