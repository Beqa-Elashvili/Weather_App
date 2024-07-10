import useGlobalProvider from "@src/Providers/useGlobalProvider";
import Carousel from "react-simply-carousel";
import { useState } from "react";
import { useGetIcons } from "@src/hooks/useGetIcons";
import { FaArrowLeft } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { Spin } from "antd";

export function CarouselWithDays() {
  const { getIcons } = useGetIcons();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { currentWeathers, currentFormat, handleCurrentMonth, itemsToShow } =
    useGlobalProvider();
  console.log(itemsToShow);

  return (
    <div className="flex flex-col bg-slate-100 bg-opacity-60 border-solid border border-blue-300 rounded-xl">
      <div className="flex items-center w-full justify-between p-2">
        <div className="flex items-center gap-2">
          <FaCalendarDays className="size-6 text-[#15719f] " />
          <p className=" text-xl text-[#15719f] ">10-DAY FORECAST</p>
        </div>
        <div
          className="cursor-pointer z-10 text-end mr-2"
          onClick={() => setActiveSlideIndex(0)}
        >
          <FaArrowLeft className="text-[#15719f] size-6" />
        </div>
      </div>
      {currentWeathers?.length === 0 && (
        <div className="text-center h-48 w-full">
          <p className="mt-14 text-3xl text-[#15719f] ">
            Daily weather is not available for this location
          </p>
        </div>
      )}
      <div className="flex gap-2 relative">
        <div className="p-2 flex justify-center gap-12 w-full">
          {!currentWeathers ? (
            <div className="h-48">
              <div className="flex items-center gap-4 mt-12">
                <p className="text-3xl font-medium text-[#15719f]">
                  please wait
                </p>
                <Spin />
              </div>
            </div>
          ) : (
            <Carousel
              activeSlideIndex={activeSlideIndex}
              onRequestChange={setActiveSlideIndex}
              itemsToShow={itemsToShow}
              itemsToScroll={1}
              speed={400}
              easing="linear"
              forwardBtnProps={{
                className:
                  "border-none h-full bg-slate-400 rounded-ee-xl opacity-0 cursor-pointer  hover:opacity-20 absolute top-1/2 right-0 transform -translate-y-1/2  ",
                children: (
                  <h1 className="p-2  h-full flex items-center text-white ">{`>`}</h1>
                ),
              }}
              backwardBtnProps={{
                className:
                  "border-none opacity-0  rounded-es-xl bg-slate-400  cursor-pointer z-10 h-full hover:opacity-20 absolute top-1/2 left-0 transform -translate-y-1/2  ",
                children: (
                  <h1 className="p-2 h-full flex items-center  text-white  ">{`<`}</h1>
                ),
              }}
            >
              {currentWeathers?.map((item, index) => (
                <div
                  key={item.datetime}
                  className="flex flex-col text-white items-center gap-2 w-full py-4 w-20 md:w-1/2 lg:w-24 xl:w-28 px-4 rounded-xl hover:bg-slate-400  cursor-pointer"
                >
                  <div className="text-center text-sm md:text-md lg:text-xl xl:text-xl">
                    {index === 0 ? (
                      <>
                        <p>Today</p>
                      </>
                    ) : (
                      <>
                        <p>{handleCurrentMonth(item.datetime)}</p>
                      </>
                    )}
                    <p className="text-xs lg:text-sm font-medium text-slate-600">
                      {item.datetime.replace(/^\d{4}-/, "").replace("-", "/")}
                    </p>
                  </div>
                  <div className="lg:text-2xl">
                    {currentFormat.Speed === "kph" ? (
                      <p>{item.temp}&deg;C</p>
                    ) : (
                      <p>{item.temp}&deg;F</p>
                    )}
                  </div>
                  <img
                    className="size-12 lg:size-16"
                    src={getIcons(item.icon)}
                    alt="weather_icon"
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
