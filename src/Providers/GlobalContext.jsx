import React, { createContext, useState, useEffect, useCallback } from "react";
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
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let Enam = [
  { Speed: "kph", Temp: "C" },
  { Speed: "Mph", Temp: "F" },
];

export const GlobalProvider = ({ children }) => {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentWeekDay, setCurrentWeekDay] = useState("");
  const [currentMonth, setcurrentMonth] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentFormat, setCurrentFormat] = useState(Enam[0]);
  const [weathers, setWeathers] = useState({
    weatherData: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSpeed = localStorage.getItem("Speed");
    if (storedSpeed === "Kph") {
      setCurrentFormat(Enam[0]);
    }
    if (storedSpeed === "Mph") {
      setCurrentFormat(Enam[1]);
    }
  }, []);

  const toggleFormat = useCallback(() => {
    if (currentFormat.Speed === Enam[0].Speed) {
      setCurrentFormat(Enam[1]);
      localStorage.setItem("Speed", "Mph");
    } else {
      setCurrentFormat(Enam[0]);
      localStorage.setItem("Speed", "Kpm");
    }
  }, [currentFormat]);

  useEffect(() => {
    if (
      TbilisiWeather?.current.condition.text === "Sunny" ||
      TbilisiWeather?.current.condition.text === "Partly cloudy"
    ) {
      setCurrentVideo("good");
      return;
    }
    if (
      TbilisiWeather?.current.condition.text === "Patchy rain nearby" ||
      TbilisiWeather?.current.condition.text === "Cloudy"
    ) {
      setCurrentVideo("middle");
      return;
    } else if (TbilisiWeather?.current.condition.text === "Moderate rain") {
      setCurrentVideo("bad");
      return;
    } else if (
      TbilisiWeather?.current.condition.text === "Mist" ||
      TbilisiWeather?.current.condition.text === "Overcast"
    ) {
      setCurrentVideo("mist");
      return;
    } else if (
      TbilisiWeather?.current.condition.text === "Blowing snow" ||
      TbilisiWeather?.current.condition.text === "Blizzard" ||
      TbilisiWeather?.current.condition.text === "Moderate snow" ||
      TbilisiWeather?.current.condition.text === "Light Snow"
    ) {
      setCurrentVideo("high snow");
      return;
    } else {
      setCurrentVideo("good");
    }
  }, [TbilisiWeather?.current.condition.text]);

  useEffect(() => {
    async function GetTbilisiWeather() {
      try {
        setLoading(true);
        const resp = await axios.get(
          "http://api.weatherapi.com/v1/forecast.json?key=91a6e75e56dc4dad8e192202241306&q=Tbilisi&days=7&aqi=yes"
        );
        setTbilisiWeather(resp.data);
        setLoading(false);
      } catch (error) {
        alert("fetch wether data failed");
      } finally {
        setLoading(false);
      }
    }
    const current = currentTime.getDay();
    const currentMonth = currentTime.getMonth();
    GetTbilisiWeather();
    setCurrentWeekDay(daysOfWeek[current]);
    setcurrentMonth(monthNames[currentMonth]);
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
        currentMonth,
        setcurrentMonth,
        currentVideo,
        setCurrentVideo,
        loading,
        setLoading,
        toggleFormat,
        currentFormat,
        setCurrentFormat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
