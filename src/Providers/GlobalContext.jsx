import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const GlobalProvider = ({ children }) => {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentWeekDay, setCurrentWeekDay] = useState();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [weathers, setWeathers] = useState({
    weatherData: [],
  });

  useEffect(() => {
    async function GetTbilisiWeather() {
      const resp = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json?key=449a4e9f33e1414cbdf154018241905&q=Tbilisi&days=7&aqi=no&alerts=no"
      );
      setTbilisiWeather(resp.data);
    }
    const current = currentTime.getDay();
    GetTbilisiWeather();
    setCurrentWeekDay(daysOfWeek[current]);
  }, [currentTime.toString()[8], currentTime.toString()[9]]);

  return (
    <GlobalContext.Provider
      value={{
        weathers,
        setWeathers,
        TbilisiWeather,
        setTbilisiWeather,
        currentTime,
        setCurrentTime,
        currentWeekDay,
        setCurrentWeekDay,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
