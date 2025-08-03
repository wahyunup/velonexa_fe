import AppLayout from "../layout/AppLayout";

const Message = () => {
  return (
    <AppLayout classname="flex">
      <div className="flex">
        <div className="bg-white p-10 flex flex-col gap-[29px] border-r-1 border-[#F4F4F4]">
          <p className="text-[27px] font-medium ">Message</p>
          <div className="flex flex-col gap-[7px] overflow-y-scroll thin-scrollbar h-[790px]">
            {Array.from({ length: 2 }).map(() => (
              <div className="flex px-[20px] py-[15px] bg-[#F5F5F5] rounded-2xl w-[363px] h-[90px] justify-between items-center">
                <div className="flex gap-[10px] items-center">
                  <div className="w-[54px] h-[54px] rounded-full overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src="https://i.pinimg.com/1200x/62/2b/8d/622b8d6ecac21e6681292bd915d74ca4.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-[240px]">
                    <span className="text-[#101010] text-sm">username</span>
                    <p className="text-[#8F8F8F] text-xs wrap-break-word h-[34px] overflow-hidden">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Eum voluptates voluptatum, molestiae eligendi aspernatur
                      repellat sit impedit praesentium laboriosam autem,
                      inventore qui eius dolores unde ea eaque minima earum
                      consectetur?
                    </p>
                  </div>
                </div>

                <span className="w-[9px] h-[9px] bg-[#3971FF] rounded-full"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-[1100px]">

          <div className="flex gap-[10px] items-center bg-white border-b-1 border-[#F4F4F4] py-[15px] px-[20px]">
            <div className="w-[54px] h-[54px] overflow-hidden rounded-full">
              <img
              className="object-cover w-full h-full"
                src="https://i.pinimg.com/1200x/62/2b/8d/622b8d6ecac21e6681292bd915d74ca4.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">username</span>
              <span className="text-xs text-[#00B11C]">online</span>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Message;
