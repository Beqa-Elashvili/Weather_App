import { useEffect, useState } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { FaTemperatureHigh } from "react-icons/fa6";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { IoEarth } from "react-icons/io5";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import axios from "axios";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function WeatherByDay() {
  const {
    TbilisiWeather,
    currentMonth,
    toggleFormat,
    currentFormat,
    currentDay,
    setCurrentDay,
  } = useGlobalProvider();
  const current = currentDay.getDay();

  const getNextTwoDays = () => {
    const nextTwoDays = [];
    for (let i = 0; i <= 2; i++) {
      nextTwoDays.push(daysOfWeek[(current + i) % 7]);
    }
    return nextTwoDays;
  };

  const reorderedDaysOfWeek = getNextTwoDays();

  return (
    <div className="z-10">
      <button onClick={toggleFormat}>fgfh</button>
      <div className="flex gap-12">
        {reorderedDaysOfWeek.map((day, index) => {
          const forecast = TbilisiWeather?.forecast?.forecastday[index];
          return (
            <div
              key={day}
              className="border-solid text-center text-white border border-blue-300 p-4 rounded bg-blue-100 bg-opacity-50"
            >
              <p className="text-xl">{day}</p>
              {forecast && (
                <>
                  {console.log(forecast.day.condition.icon)}
                  <div className="flex flex-col items-center gap-2">
                    <p>
                      {forecast.date.split("-").pop()} {currentMonth}
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="border-solid text-center border border-blue-300 bg-blue-500 p-4 rounded-xl">
                        <div className="flex items-center gap-1">
                          <IoEarth />-<p>Avg Temp</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {currentFormat.Speed === "kph" ? (
                            <>
                              <p>{forecast.day.avgtemp_c}</p>-&deg;C
                            </>
                          ) : (
                            <>
                              <p>{forecast.day.avgtemp_f}</p>-&deg;F
                            </>
                          )}
                          <LiaTemperatureHighSolid className="text-yellow-500 size-4" />
                        </div>
                      </div>
                      <div className="border-solid text-center border border-blue-300 bg-blue-500 p-4 rounded-xl">
                        <div className="flex items-center gap-1">
                          <FaWind />-<p>max wind</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {currentFormat.Speed === "kph" ? (
                            <p>{forecast.day.maxwind_kph}-Kph</p>
                          ) : (
                            <p>{forecast.day.maxwind_mph}-Mph</p>
                          )}
                        </div>
                      </div>
                      <div className="border-solid text-center border border-blue-300 bg-blue-500 p-4 rounded-xl">
                        <div className="flex items-center gap-1">
                          <FaSun />-<p>MaxTemp</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {currentFormat.Speed === "kph" ? (
                            <p>{forecast.day.maxtemp_c}-&deg;C</p>
                          ) : (
                            <p>{forecast.day.maxtemp_f}-&deg;F</p>
                          )}
                          <FaSun className="text-yellow-500 size-4" />
                        </div>
                      </div>
                      <div className="border-solid text-center border border-blue-300 bg-blue-500 p-4 rounded-xl">
                        <div className="flex items-center gap-1">
                          <FaSun />-<p>MinTemp</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          {currentFormat.Speed === "kph" ? (
                            <p>{forecast.day.mintemp_c}-&deg;C</p>
                          ) : (
                            <p>{forecast.day.mintemp_f}-&deg;F</p>
                          )}
                          <FaSun className="text-yellow-500 size-4" />
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <p>
                        <LuSunrise className="text-yellow-600" />{" "}
                        {forecast.astro.sunrise.split(" ").slice(0, 1)}
                      </p>
                      <p>
                        <LuSunset className="text-yellow-600" />{" "}
                        {forecast.astro.sunset.split(" ").slice(0, 1)}
                      </p>
                    </div> */}
                    <div className="text-center">
                      <img
                        className="size-12"
                        src={forecast.day.condition.icon}
                        alt="weather_icon"
                      />
                    </div>
                    <div className="text-center w-full">
                      <div className="flex justify-around w-full">
                        <div>
                          <p>{forecast.astro.sunrise}</p>
                          <FiSunrise className="text-orange-500" />
                        </div>
                        <div>
                          <p>{forecast.astro.sunset}</p>
                          <FiSunset className="text-orange-500" />
                        </div>
                      </div>
                      <p className="bg-yellow-200 h-px"></p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
