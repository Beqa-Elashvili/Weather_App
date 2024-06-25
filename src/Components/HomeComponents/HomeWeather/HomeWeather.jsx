import React from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { GetCurrentTime } from "@src/Components/CurrentTime";
import { CurrentHoursCarousel } from "@src/Components/CarouselWithHours";

export function HomeWeather() {
  const { TbilisiWeather, currentWeekDay, currentFormat } = useGlobalProvider();

  return (
    <div className="bg-blue-200  bg-opacity-50 text-white flex flex-col z-10 gap-2 border-solid border border-blue-300 rounded max-w-[400px]">
      {TbilisiWeather !== undefined && (
        <div>
          <div className="flex justify-between">
            <div className="p-4">
              <h1 className="text-[#15719f] max-w-48">
                {TbilisiWeather.location.name}
              </h1>
              <p className="text-[#15719f] text-balance">
                Country: {TbilisiWeather.location.country}
              </p>
              <div>
                <GetCurrentTime />
              </div>
              <p>{currentWeekDay}</p>
            </div>
            <div className="p-4 mr-4 text-center">
              <p className="text-2xl max-w-40 text-[#3c91b8]">
                {TbilisiWeather.current.condition.text}
              </p>
              {currentFormat.Speed === "kph" ? (
                <p className="text-5xl text-[#15719f] ">
                  {TbilisiWeather.current.temp_c}&deg;C
                </p>
              ) : (
                <p className="text-5xl text-[#15719f] ">
                  {TbilisiWeather.current.temp_f}&deg;F
                </p>
              )}
            </div>
          </div>
          <div>
            <div>
              <CurrentHoursCarousel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
