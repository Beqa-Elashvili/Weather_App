import React from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { GetCurrentTime } from "@src/Components/CurrentTime";
import { CurrentHoursCarousel } from "@src/Components/CarouselWithHours";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TbCloudSearch } from "react-icons/tb";

export function HomeWeather() {
  const { TbilisiWeather, currentWeekDay, currentFormat } = useGlobalProvider();
  return (
    <div className="relative w-full p-4 bg-slate-100 bg-opacity-60 text-white flex flex-col z-10 gap-2 border-solid border border-blue-300 rounded-xl max-w-[400px]">
      <div className="absolute top-2 left-2">
        <GetCurrentTime />
      </div>
      {TbilisiWeather !== undefined && (
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-[#15719f] max-w-48">
              {TbilisiWeather.location.name}
            </h1>
            <p className="text-[#15719f] text-balance">
              Country: {TbilisiWeather.location.country}
            </p>
            <p>{currentWeekDay}</p>
          </div>
          <div className="p-4 mr-4 text-center">
            {currentFormat.Speed === "kph" ? (
              <p className="text-6xl text-[#15719f] ">
                {TbilisiWeather.current.temp_c}&deg;C
              </p>
            ) : (
              <p className="text-6xl text-[#15719f] ">
                {TbilisiWeather.current.temp_f}&deg;F
              </p>
            )}
            <p className="text-3xl max-w-60 mt-2 text-[#3c91b8]">
              {TbilisiWeather.current.condition.text}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-500 p-4 rounded-xl w-40">
              <div className="flex items-center gap-2 text-[#a0d9f5]">
                <LiaTemperatureHighSolid className="size-6" />
                <p>Feels Like</p>
              </div>
              <div className="text-3xl flex mt-2">
                {currentFormat.Speed === "kph" ? (
                  <>
                    <p>{TbilisiWeather.current.feelslike_c} &deg;C</p>
                  </>
                ) : (
                  <>
                    <p>{TbilisiWeather.current.feelslike_f} &deg;F</p>
                  </>
                )}
              </div>
            </div>
            <div className="bg-slate-500 p-4 rounded-xl w-40">
              <div className="flex items-center gap-2 text-[#a0d9f5]">
                <FaWind className="size-6" />
                <p>max wind</p>
              </div>
              <div className="text-3xl flex mt-2">
                {currentFormat.Speed === "kph" ? (
                  <p>{TbilisiWeather.current.wind_kph} Kph</p>
                ) : (
                  <p>{TbilisiWeather.current.wind_mph} Mph</p>
                )}
              </div>
            </div>
            <div className="bg-slate-500 p-4 rounded-xl w-40">
              <div className="flex items-center gap-2 text-[#a0d9f5]">
                <WiHumidity className="size-6" />
                <p>Humidity</p>
              </div>
              <div className="text-3xl flex mt-2">
                {TbilisiWeather.current.humidity} %
              </div>
            </div>
            <div className="bg-slate-500 p-4 rounded-xl w-40">
              <div className="flex items-center gap-2 text-[#a0d9f5]">
                <TbCloudSearch className="size-6" />
                <p>C O</p>
              </div>
              <div className="text-3xl flex mt-2">
                {TbilisiWeather.current.air_quality.co}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
