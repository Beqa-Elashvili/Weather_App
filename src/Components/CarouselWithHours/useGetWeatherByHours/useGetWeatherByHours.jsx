import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useEffect, useState } from "react";

export function useGetWeatherByHours() {
  const { TbilisiWeather, currentTime } = useGlobalProvider();
  const [FilteredHours, setFilteredHours] = useState();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const getNextHours = (startDayIndex, startHourIndex) => {
    const hours = [];
    let currentDayIndex = startDayIndex;
    let currentHourIndex = startHourIndex;
    while (
      hours.length < 18 &&
      currentDayIndex < TbilisiWeather?.forecast.forecastday.length
    ) {
      const day = TbilisiWeather?.forecast.forecastday[currentDayIndex];
      while (currentHourIndex < day.hour.length && hours.length < 18) {
        hours.push(day.hour[currentHourIndex]);
        currentHourIndex++;
      }
      currentDayIndex++;
      currentHourIndex = 0;
    }
    return hours;
  };

  function FindCurrectTime() {
    const filter = TbilisiWeather?.forecast.forecastday.map((item) =>
      item.hour.filter(
        (item) =>
          item.time.toString()[11] === currentTime.toString()[16] &&
          item.time.toString()[12] === currentTime.toString()[17]
      )
    );
    if (filter && filter[0][0]) {
      let cut = filter[0][0].time;
      setFilteredHours(parseInt(cut.slice(10, 13)));
    }
  }
  const firstDay = TbilisiWeather?.forecast.forecastday[0];
  const startIndex = firstDay?.hour.findIndex((hour) => {
    const hourValue = parseInt(hour.time.substring(11, 13));
    return hourValue >= FilteredHours;
  });

  let hoursToShow = [];
  if (startIndex !== -1) {
    hoursToShow = getNextHours(0, startIndex);
  } else {
    hoursToShow = getNextHours(0, 0);
  }
  useEffect(() => {
    FindCurrectTime();
  }, [TbilisiWeather, currentTime]);

  return { hoursToShow, activeSlideIndex, setActiveSlideIndex };
}
