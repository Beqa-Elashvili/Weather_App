import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";

export function WeatherDayCostumize() {
  const { currentFormat, handleCurrentMonth, currentWeathers } =
    useGlobalProvider();

  let icon = "";
  const getIcons = (item) => {
    switch (item) {
      case "clear-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/113.png";
        break;
      case "clear-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/113.png";
        break;
      case "partly-cloudy-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/116.png";
        break;
      case "partly-cloudy-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/116.png";
        break;
      case "cloudy":
        icon = "//cdn.weatherapi.com/weather/64x64/day/119.png";
        break;
      case "fog":
        icon = "//cdn.weatherapi.com/weather/64x64/day/248.png";
        break;
      case "hail":
        icon = "/Images/hail.png";
        break;
      case "rain-snow-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/182.png";
        ble;
        break;
      case "rain-snow-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/182.png";
      case "rain-snow":
        icon = "//cdn.weatherapi.com/weather/64x64/day/320.png";
      case "rain":
        icon = "//cdn.weatherapi.com/weather/64x64/day/296.png";
        break;
      case "showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/353.png";
        break;
      case "showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/353.png";
        r;
        break;
      case "sleet":
        icon = "//cdn.weatherapi.com/weather/64x64/day/317.png";
        break;
      case "snow-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/368.png";
        break;
      case "snow-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/368.png";
        break;
      case "snow":
        icon = "//cdn.weatherapi.com/weather/64x64/day/326.png";
        break;
      case "thunder-rain":
        icon = "//cdn.weatherapi.com/weather/64x64/day/389.png";
        break;
      case "thunder-showers-day":
        icon = "//cdn.weatherapi.com/weather/64x64/day/386.png";
        break;
      case "thunder-showers-night":
        icon = "//cdn.weatherapi.com/weather/64x64/night/386.png";
        break;
      case "thunder":
        icon = "//cdn.weatherapi.com/weather/64x64/day/200.png";
        break;
      case "wind":
        icon = "/Images/wind.png";
        break;
      default:
        icon = "//cdn.weatherapi.com/weather/64x64/day/119.png";
    }
    return icon;
  };

  return (
    <div>
      <div className="grid grid-cols-7 text-center gap-2">
        {currentWeathers?.map((item, index) => {
          return (
            <div
              className="z-10 border-solid border border-blue-300 rounded bg-blue-200 bg-opacity-50 p-1"
              key={index}
            >
              <img src={getIcons(item.icon)} alt="weather icon" />
              <div className="flex gap-1 justify-center">
                {index === 0 ? (
                  <p>Today</p>
                ) : (
                  <p>{handleCurrentMonth(item.datetime)}</p>
                )}
              </div>
              <div className="flex items-center justify-around  text-blue-600 text-lg">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <p>Feel</p>
                    <LiaTemperatureHighSolid className="text-orange-500" />
                  </div>
                  <div className="border-solid bg-white w-[90px] border-blue-300 p-1 border rounded-xl flex items-center justify-center">
                    {currentFormat.Speed === "kph" ? (
                      <p>
                        {item.feelslike}{" "}
                        <span className="text-orange-500 text-sm">&deg;C</span>
                      </p>
                    ) : (
                      <p>
                        {item.feelslike}{" "}
                        <span className="text-orange-500 text-sm">&deg;F</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="flex items-center gap-2">
                    Wind
                    <FaWind className="text-white" />
                  </p>
                  <div className="border-solid bg-white w-[90px]  p-1 border-blue-300 border rounded-xl flex items-center justify-center">
                    {currentFormat.Speed === "kph" ? (
                      <p>
                        {item.windspeed}{" "}
                        <span className="text-orange-500 text-sm">Kph</span>
                      </p>
                    ) : (
                      <p>
                        {item.windspeed}{" "}
                        <span className="text-orange-500 text-sm"> Mph</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <p className="mt-2 text-blue-600 border-solid bg-white p-2 rounded-full text-lg w-20 h-20   flex items-center justify-center border border-blue-500 float-start">
                  {item.temp}{" "}
                  {currentFormat.Speed === "kph" ? (
                    <span className="text-orange-500 ml-2">C&deg;</span>
                  ) : (
                    <span className="text-orange-500 ml-2">F&deg;</span>
                  )}
                </p>
                <div className="mt-2 w-24 flex gap-2  text-blue-600 border-solid bg-white p-2 rounded-lg  flex items-center justify-center border border-blue-500">
                  <FcElectricity className="size-8" />
                  <p>{item.solarenergy}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
