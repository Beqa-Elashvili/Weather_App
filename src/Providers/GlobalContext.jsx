import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import useToken from "antd/es/theme/useToken";
import { useRef } from "react";

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

let Enam = [
  { Speed: "kph", Temp: "C" },
  { Speed: "Mph", Temp: "F" },
];

export const GlobalProvider = ({ children }) => {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentWeekDay, setCurrentWeekDay] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentFormat, setCurrentFormat] = useState(Enam[0]);
  const [currentDay, setCurrentDay] = useState(new Date());

  const [weathers, setWeathers] = useState({
    weatherData: [],
  });
  const [loading, setLoading] = useState(true);

  const getMonthName = (date) => {
    const months = [
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
    return months[date.getMonth()];
  };

  const handleCurrentMonth = (day) => {
    const itemDate = new Date(day);
    const formattedDate = `${getMonthName(itemDate)} ${itemDate.getDate()}`;
    return formattedDate;
  };

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
    const mainVideo = TbilisiWeather?.current.condition.text;
    if (mainVideo === "Sunny" || mainVideo === "Partly cloudy") {
      setCurrentVideo("good");
      return;
    }
    if (
      mainVideo === "Patchy rain nearby" ||
      mainVideo === "Cloudy" ||
      mainVideo === "Moderate rain at times" ||
      mainVideo === "Thundery outbreaks in nearby" ||
      mainVideo === "Moderate or heavy rain with thunder"
    ) {
      setCurrentVideo("middle");
      return;
    } else if (
      mainVideo === "Moderate rain" ||
      mainVideo === "Moderate or heavy rain shower"
    ) {
      setCurrentVideo("bad");
      return;
    } else if (mainVideo === "Mist" || mainVideo === "Overcast") {
      setCurrentVideo("mist");
      return;
    } else if (
      mainVideo === "Blowing snow" ||
      mainVideo === "Blizzard" ||
      mainVideo === "Moderate snow" ||
      mainVideo === "Light Snow"
    ) {
      setCurrentVideo("high snow");
      return;
    } else {
      setCurrentVideo("good");
    }
  }, [TbilisiWeather?.current.condition.text]);
  const [timeZone, setTimeZone] = useState("");

  async function GetTbilisiWeather(City) {
    try {
      setLoading(true);
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=91a6e75e56dc4dad8e192202241306&lang=en&q=${City}&days=7&aqi=yes`
      );
      setTbilisiWeather(resp.data);
      const timeZone = resp.data.location.tz_id;
      setTimeZone(timeZone);
      setLoading(false);
    } catch (error) {
      alert("fetch wether data failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const current = currentTime.getDay();
    GetTbilisiWeather("Tbilisi");
    setCurrentWeekDay(daysOfWeek[current]);
  }, [currentTime.toString()[8], currentTime.toString()[9]]);

  const videoRef = useRef(null);
  let weather = "";

  switch (currentVideo) {
    case "good":
      weather = "./videos/good weather.mp4";
      break;
    case "middle":
      weather = "./videos/middle weather.mp4";
      break;
    case "bad":
      weather = "./videos/bad weather.mp4";
      break;
    case "mist":
      weather = "./videos/mist weather.mp4";
      break;
    case "high snow":
      weather = "./videos/high snow.mp4";
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, []);

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
        currentVideo,
        weather,
        setCurrentVideo,
        timeZone,
        setTimeZone,
        loading,
        setLoading,
        toggleFormat,
        currentFormat,
        setCurrentFormat,
        currentDay,
        setCurrentDay,
        GetTbilisiWeather,
        handleCurrentMonth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
