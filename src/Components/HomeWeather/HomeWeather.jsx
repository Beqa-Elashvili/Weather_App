import axios from "axios";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";

export function HomeWeather() {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [FilteredHours, setFilteredHours] = useState();

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  function FindCurrectTime() {
    const filter = TbilisiWeather.forecast.forecastday.map((item) =>
      item.hour.filter(
        (item) =>
          item.time.toString()[11] === currentTime.toString()[16] &&
          item.time.toString()[12] === currentTime.toString()[17]
      )
    );
    let cut = filter[0][0].time;
    setFilteredHours(parseInt(cut.slice(10, 13)));
  }

  function getCurrentHoursWeathers() {
    return (
      <div className="flex gap-2">
        {TbilisiWeather.forecast.forecastday.map((day, index) => {
          let hours = [];
          if (day.hour) {
            if (index === 0) {
              const startIndex = day.hour.findIndex((hour) => {
                const hourValue = parseInt(hour.time.substring(11, 13));
                return hourValue >= FilteredHours;
              });
              hours = day.hour.slice(startIndex);
            } else {
              hours = day.hour;
            }
            return hours.slice(0, 2).map((hour) => (
              <div key={hour.time} className="flex flex-col items-center gap-2">
                <img className="size-8" src={hour.condition.icon} alt="" />
                <div className="flex">
                  <FiSun className="mr-1 mt-1 text-yellow-400" />
                  <div>
                    <p>{hour.temp_c} &deg;C</p>
                    <p>{hour.time.split(" ")[1]}</p>
                  </div>
                </div>
              </div>
            ));
          }
        })}
      </div>
    );
  }

  useEffect(() => {
    async function GetTbilisiWeather() {
      const resp = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json?key=449a4e9f33e1414cbdf154018241905&q=Tbilisi&days=2&aqi=no&alerts=no"
      );
      setTbilisiWeather(resp.data);
    }
    GetTbilisiWeather();
  }, [currentTime.toString()[8], currentTime.toString()[9]]);

  useEffect(() => {
    if (TbilisiWeather !== undefined) {
      FindCurrectTime();
    }
  }, [TbilisiWeather, currentTime]);

  return (
    <div className=" flex flex-col gap-2 border-solid border border-blue-300 p-4 rounded">
      {TbilisiWeather !== undefined && (
        <>
          <div>
            <h1 className="text-[#15719f]">{TbilisiWeather.location.name}</h1>
            <p className="text-[#15719f]">
              Country: {TbilisiWeather.location.country}
            </p>
          </div>
          <div>
            <p>{formatTime(currentTime)}</p>
            <div>{getCurrentHoursWeathers()}</div>
          </div>
        </>
      )}
    </div>
  );
}
