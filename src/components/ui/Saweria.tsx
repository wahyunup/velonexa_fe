import { useState } from "react"
import { LuExternalLink } from "react-icons/lu"

const Saweria = () => {
  const [hover, setHover] = useState(false)

    return (
        <>
         <a  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} href="https://saweria.co/wahyunup" target="_blank" className={` ${hover ? "mb-1 shadow-md shadow-[#f5a623FF]/15 w-fit" : ""}  bottom-5 right-5 fixed w-fit transition-all duration-500 ease-in-out  p-4 border bg-gradient-to-b from-[#ffefd5] to-white from-0% to-80% border-[#f5a623FF] h-fit rounded-2xl flex gap-5`}>
            <div className={`flex w-full gap-5 transition-all duration-500 ${hover ? "justify-between" : ""}`}>
              <div className="flex items-center  gap-2">
                <img className="w-7" src="/saweria/logo-saweria.png" alt="saweria" />
                {hover ? (
                  <>
                <div className="flex flex-col">
                <h1 className="text-sm">saweria :</h1>
                <p className="text-sm font-semibold">Traktir Developer</p>
                </div>
                  </>
                ) : null}
              </div>
              {hover ? (

                <div className="p-3 bg-[#ffeed3] w-fit h-fit rounded-lg border border-[#f5a623FF]">
                  <LuExternalLink size={16}/>
                </div>
                ): null}
          
            </div>
        
          </a>
        </>
    )
}

export default Saweria