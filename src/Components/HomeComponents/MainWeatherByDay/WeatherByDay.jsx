import { useEffect, useState } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { FaTemperatureHigh } from "react-icons/fa6";
import { LuSunrise, LuSunset } from "react-icons/lu";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function WeatherByDay() {
  const { TbilisiWeather, currentMonth } = useGlobalProvider();
  const [currentDay, setCurrentDay] = useState(new Date());
  const current = currentDay.getDay();

  const getNextThreeDays = () => {
    const nextThreeDays = [];
    for (let i = 0; i < 3; i++) {
      nextThreeDays.push(daysOfWeek[(current + i) % 7]);
    }
    return nextThreeDays;
  };

  const reorderedDaysOfWeek = getNextThreeDays();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // const [other, setOther] = useState();

  // useEffect(() => {
  //   async function getOther() {
  //     const resp = await axios.get(
  //       "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/tbilisi?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=UZX2S8964NKCR42RGD2KYW4WG&options=beta&contentType=json"
  //     );
  //     setOther(resp.data);
  //   }
  //   getOther();
  // }, []);

  return (
    <div className="z-10">
      <div className="flex gap-12">
        {reorderedDaysOfWeek.map((day, index) => {
          const forecast = TbilisiWeather?.forecast?.forecastday[index];
          return (
            <div
              key={day}
              className="border-solid border border-blue-300 p-4 rounded bg-blue-100 bg-opacity-50"
            >
              <p className="text-xl">{day}</p>
              {forecast && (
                <>
                  <div className="flex flex-col gap-2">
                    <p>
                      {forecast.date.split("-").pop()} {currentMonth}
                    </p>
                    <div>
                      <p>
                        <LuSunrise className="text-yellow-600" />{" "}
                        {forecast.astro.sunrise.split(" ").slice(0, 1)}
                      </p>
                      <p>
                        <LuSunset className="text-yellow-600" />{" "}
                        {forecast.astro.sunset.split(" ").slice(0, 1)}
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        className="size-12"
                        src={forecast.day.condition.icon}
                        alt="weather_icon"
                      />
                    </div>
                    <div className="flex">
                      <p className="flex items-center gap-1">
                        <FaTemperatureHigh className="text-yellow-500" />
                        {forecast.day.maxtemp_c}
                      </p>
                      {" - "}
                      <p>{forecast.day.mintemp_c}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
