import { LuSend } from "react-icons/lu"
import type { InputChatProps } from "../ui"

const InputChat = ({handleSendChat, user, setChatValue, chatValue}:InputChatProps) => {
    return (
        <>
         <form
                onSubmit={handleSendChat}
                className="bg-white flex items-center p-5">
                <div className=" w-full rounded-full h-fit bg-gray-50 flex items-center gap-3 p-2 pr-5">
                  <div className="w-10 h-9 overflow-hidden rounded-full">
                    <img
                      src={user.image}
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
                  <button className="cursor-pointer" type="submit">
                    <LuSend size={18} color="#0047FF" />
                  </button>
                </div>
              </form>
        </>
    )
}

export default InputChat