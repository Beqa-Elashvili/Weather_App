import useGlobalProvider from "@src/Providers/useGlobalProvider";
import Carousel from "react-simply-carousel";
import { FiSun } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { useGetWeatherByHours } from "./useGetWeatherByHours";

export function CarouselWithHours() {
  const { currentFormat, itemsToShow } = useGlobalProvider();
  const { hoursToShow, activeSlideIndex, setActiveSlideIndex } =
    useGetWeatherByHours();

  return (
    <div className="z-10 w-full">
      <div className="flex flex-col bg-slate-100 bg-opacity-60 border-solid border border-blue-300 rounded-xl">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <IoTimeOutline className="size-6 text-[#15719f] " />
            <p className=" text-xl text-[#15719f] ">HOURLY FORECAST</p>
          </div>
          <div
            className="cursor-pointer z-10 text-end mr-2"
            onClick={() => setActiveSlideIndex(0)}
          >
            <FaArrowLeft className="text-[#15719f] size-6" />
          </div>
        </div>
        <div className="flex gap-2 relative">
          <div className="p-2 flex gap-12 w-full">
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
              {hoursToShow.map((hour, index) => (
                <div
                  key={hour.time}
                  className="flex flex-col text-xl text-white items-center gap-2  py-4 w-[78px] md:w-1/2 lg:w-24 xl:w-28 px-4 rounded-xl hover:bg-slate-400  cursor-pointer"
                >
                  <div className="text-md lg:text-xl xl:text-xl">
                    {index === 0 ? (
                      <p>Now</p>
                    ) : (
                      <p>{hour.time.split(" ")[1]}</p>
                    )}
                  </div>
                  <img
                    className="size-8 lg:size-12"
                    src={hour.condition.icon}
                    alt="icon"
                  />
                  <div className="flex items-center">
                    <FiSun className="mr-1 mt-1  text-yellow-400" />
                    <div className="block lg:hidden text-md lg:text-2xl">
                      {currentFormat.Speed === "kph" ? (
                        <p>{hour.temp_c}&deg;</p>
                      ) : (
                        <p>{hour.temp_f}&deg;</p>
                      )}
                    </div>
                    <div className="hidden lg:block text-sm lg:text-2xl">
                      {currentFormat.Speed === "kph" ? (
                        <p>{hour.temp_c}&deg;C</p>
                      ) : (
                        <p>{hour.temp_f}&deg;F</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
