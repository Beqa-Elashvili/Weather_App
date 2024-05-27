import axios from "axios";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";

export function HomeWeather() {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentWeekDay, setCurrentWeekDay] = useState();
  const [FilteredHours, setFilteredHours] = useState();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
    const getNextHours = (startDayIndex, startHourIndex) => {
      const hours = [];
      let currentDayIndex = startDayIndex;
      let currentHourIndex = startHourIndex;
      while (
        hours.length < 5 &&
        currentDayIndex < TbilisiWeather.forecast.forecastday.length
      ) {
        const day = TbilisiWeather.forecast.forecastday[currentDayIndex];
        while (currentHourIndex < day.hour.length && hours.length < 5) {
          hours.push(day.hour[currentHourIndex]);
          currentHourIndex++;
        }
        currentDayIndex++;
        currentHourIndex = 0;
      }

      return hours;
    };
    const firstDay = TbilisiWeather.forecast.forecastday[0];
    const startIndex = firstDay.hour.findIndex((hour) => {
      const hourValue = parseInt(hour.time.substring(11, 13));
      return hourValue >= FilteredHours;
    });

    let hoursToShow = [];
    if (startIndex !== -1) {
      hoursToShow = getNextHours(0, startIndex);
    } else {
      hoursToShow = getNextHours(0, 0);
    }

    return (
      <div className="flex gap-2">
        {hoursToShow.map((hour) => (
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
        ))}
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
    setCurrentWeekDay(currentTime.getDay());
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
            <p>{daysOfWeek[currentWeekDay]}</p>
            <div>{getCurrentHoursWeathers()}</div>
          </div>
        </>
      )}
    </div>
  );
}
