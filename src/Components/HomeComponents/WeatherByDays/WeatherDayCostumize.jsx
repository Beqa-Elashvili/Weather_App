import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useState, useEffect } from "react";
import axios from "axios";

export function WeatherDayCostumize() {
  const { TbilisiWeather, currentMonth, currentDay } = useGlobalProvider();
  const currentData = currentDay.getDate();
  const [currentWeathers, setCurrentWeathers] = useState();
  console.log(TbilisiWeather?.forecast.forecastday.map((item) => item.hour));

  useEffect(() => {
    async function getOther() {
      const resp = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tbilisi/2024-06-${
          currentData + 3
        }/2024-06-${
          currentData + 9
        }?unitGroup=metric&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
      );
      setCurrentWeathers(resp.data.days);
    }
    getOther();
  }, []);

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
      <div className="grid grid-cols-7 text-center gap-5">
        {currentWeathers?.map((item, index) => (
          <div
            className="z-10 border-solid border border-blue-300 rounded bg-blue-200 bg-opacity-50"
            key={index}
          >
            <img src={getIcons(item.icon)} alt="weather icon" />
            <div className="flex gap-1 justify-center">
              <p>{item.datetime.split("-").pop()}</p>
              <p>{currentMonth}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
