import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import React from "react";
import Carousel from "react-simply-carousel";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { FaArrowLeft } from "react-icons/fa6";

export function HomeWeather() {
  const {
    TbilisiWeather,
    currentTime,
    setCurrentTime,
    currentWeekDay,
    currentFormat,
  } = useGlobalProvider();
  const [FilteredHours, setFilteredHours] = useState();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

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
        hours.length < 18 &&
        currentDayIndex < TbilisiWeather.forecast.forecastday.length
      ) {
        const day = TbilisiWeather.forecast.forecastday[currentDayIndex];
        while (currentHourIndex < day.hour.length && hours.length < 18) {
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
      <div className="flex gap-2 relative z-10">
        <Carousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={5}
          itemsToScroll={1}
          speed={400}
          easing="linear"
          forwardBtnProps={{
            className:
              "border-none h-full opacity-0 cursor-pointer  hover:opacity-20 absolute top-1/2 right-0 transform -translate-y-1/2  ",
            children: (
              <h1 className="p-2 bg-slate-400 h-full flex items-center text-white ">{`>`}</h1>
            ),
          }}
          backwardBtnProps={{
            className:
              "border-none opacity-0 cursor-pointer z-10 h-full hover:opacity-20 absolute top-1/2 left-0 transform -translate-y-1/2  ",
            children: (
              <h1 className="p-2  bg-slate-400 h-full flex items-center   text-white  ">{`<`}</h1>
            ),
          }}
        >
          {hoursToShow.map((hour) => (
            <div
              key={hour.time}
              className="flex flex-col items-center gap-2 min-w-20 py-4"
            >
              <img className="size-8" src={hour.condition.icon} alt="" />
              <div className="flex">
                <FiSun className="mr-1 mt-1 text-yellow-400" />
                <div>
                  {currentFormat.Speed === "kph" ? (
                    <p>{hour.temp_c}&deg;C</p>
                  ) : (
                    <p>{hour.temp_f}&deg;F</p>
                  )}
                  <p>{hour.time.split(" ")[1]}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

  useEffect(() => {
    if (TbilisiWeather !== undefined) {
      FindCurrectTime();
    }
  }, [TbilisiWeather, currentTime]);

  return (
    <div className="bg-blue-200  bg-opacity-50 text-white flex flex-col z-10 gap-2 border-solid border border-blue-300 rounded">
      {TbilisiWeather !== undefined && (
        <div>
          <div className="flex justify-between">
            <div className="p-4">
              <h1 className="text-[#15719f]">{TbilisiWeather.location.name}</h1>
              <p className="text-[#15719f]">
                Country: {TbilisiWeather.location.country}
              </p>
              <p>{formatTime(currentTime)}</p>
              <p>{currentWeekDay}</p>
            </div>
            <div className="p-4 mr-4 text-center">
              <p className="text-2xl max-w-40text-[#3c91b8]">
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
            <div
              className="cursor-pointer z-10 text-end mr-2"
              onClick={() => setActiveSlideIndex(0)}
            >
              <FaArrowLeft className="text-[#15719f] size-6" />
            </div>
            <div>{getCurrentHoursWeathers()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
