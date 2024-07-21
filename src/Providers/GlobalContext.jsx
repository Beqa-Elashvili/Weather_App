import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

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

const getWeatherVideoPath = (currentVideo) => {
  switch (currentVideo) {
    case "good":
      return "/videos/good weather.mp4";
    case "middle":
      return "/videos/middle weather.mp4";
    case "bad":
      return "/videos/bad weather.mp4";
    case "mist":
      return "/videos/mist weather.mp4";
    case "high snow":
      return "/videos/high snow.mp4";
    default:
      return "";
  }
};

export const GlobalProvider = ({ children }) => {
  const [TbilisiWeather, setTbilisiWeather] = useState();
  const [currentWeekDay, setCurrentWeekDay] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentVideo, setCurrentVideo] = useState("");
  const [currentFormat, setCurrentFormat] = useState(Enam[0]);
  const [currentDay, setCurrentDay] = useState(new Date());
  const [currentWeathers, setCurrentWeathers] = useState();
  const [timeZone, setTimeZone] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(8);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 2560) {
        setItemsToShow(20);
      } else if (window.innerWidth >= 1280) {
        setItemsToShow(8);
      } else if (window.innerWidth >= 1024) {
        setItemsToShow(4);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(8);
      } else if (window.innerWidth >= 425) {
        setItemsToShow(4);
      } else {
        setItemsToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoRef = useRef(null);

  const handleCurrentMonth = (day) => {
    const itemDate = new Date(day);
    const options = { weekday: "long" };
    const formattedDate = itemDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    const storedSpeed = localStorage.getItem("Speed");
    if (storedSpeed === "Mph") {
      setCurrentFormat(Enam[1]);
    } else if (storedSpeed === "kph") {
      setCurrentFormat(Enam[0]);
    }
  }, []);

  const toggleFormat = useCallback(() => {
    if (currentFormat.Speed === Enam[0].Speed) {
      setCurrentFormat(Enam[1]);
      localStorage.setItem("Speed", "Mph");
    } else {
      setCurrentFormat(Enam[0]);
      localStorage.setItem("Speed", "kph");
    }
  }, [currentFormat]);

  useEffect(() => {
    if (TbilisiWeather !== undefined) {
      const mainVideo = TbilisiWeather?.current.condition.text;
      switch (mainVideo) {
        case "Sunny":
        case "Partly cloudy":
          setCurrentVideo("good");
          break;
        case "Patchy rain nearby":
        case "Cloudy":
        case "Moderate rain at times":
        case "Thundery outbreaks in nearby":
        case "Moderate or heavy rain with thunder":
        case "Patchy light rain in area with thunder":
          setCurrentVideo("middle");
          break;
        case "Moderate rain":
        case "Moderate or heavy rain shower":
          setCurrentVideo("bad");
          break;
        case "Mist":
        case "Overcast":
          setCurrentVideo("mist");
          break;
        case "Blowing snow":
        case "Blizzard":
        case "Moderate snow":
        case "Light Snow":
          setCurrentVideo("high snow");
          break;
        default:
          setCurrentVideo("good");
      }
    }
  }, [TbilisiWeather?.current.condition.text]);

  async function GetTbilisiWeather() {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=91a6e75e56dc4dad8e192202241306&lang=en&q=Tbilisi&days=7&aqi=yes`
      );
      setTbilisiWeather(resp.data);
      const timeZone = resp.data.location.tz_id;
      setTimeZone(timeZone);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const startDate = new Date(currentDay);
  const endDate = new Date(currentDay);
  endDate.setDate(currentDay.getDate() + 17);

  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  async function getDays() {
    try {
      const handleFormat = currentFormat.Speed === "kph" ? "metric" : "us";
      const resp = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tbilisi/${formattedStartDate}/${formattedEndDate}?unitGroup=${handleFormat}&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
      );
      setCurrentWeathers(resp.data.days);
    } catch (error) {
      alert(
        `${error.response.data
          .split(" ")
          .slice(0, 13)
          .join(" ")} please try again later.`
      );
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      getDays();
    }
  }, [currentFormat]);

  useEffect(() => {
    if (location.pathname === "/") {
      GetTbilisiWeather();
    }
    const current = currentTime.getDay();
    setCurrentWeekDay(daysOfWeek[current]);
  }, [currentTime.toString()[8], currentTime.toString()[9], location]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, [currentVideo]);

  const weather = getWeatherVideoPath(currentVideo);

  return (
    <GlobalContext.Provider
      value={{
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
        currentWeathers,
        setCurrentWeathers,
        formattedStartDate,
        formattedEndDate,
        searchResult,
        setSearchResult,
        itemsToShow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
