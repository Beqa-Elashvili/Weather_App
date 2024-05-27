import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/Providers/GlobalContext";

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
  const { TbilisiWeather } = useContext(GlobalContext);
  const [currentDay, setCurrentDay] = useState(new Date());
  const current = currentDay.getDay();

  const reorderedDaysOfWeek = [
    ...daysOfWeek.slice(current),
    ...daysOfWeek.slice(0, current),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDay(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <div className="flex gap-4">
          {reorderedDaysOfWeek.map((day, index) => {
            return (
              <div key={index}>
                <p>{day}</p>
                {TbilisiWeather !== undefined && (
                  <>
                    <div>
                      <div>
                        {TbilisiWeather.forecast.forecastday[index].date}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div>
          {TbilisiWeather !== undefined && (
            <>
              {TbilisiWeather.forecast.forecastday.map((item, index) => {
                return <div key={index}></div>;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
