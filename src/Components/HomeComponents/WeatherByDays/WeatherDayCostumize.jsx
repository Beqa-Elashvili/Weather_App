import { useContext } from "react";
import { GlobalContext } from "@src/Providers/GlobalContext";

export function WeatherDayCostumize() {
  const { TbilisiWeather, currentMonth } = useContext(GlobalContext);
  console.log(TbilisiWeather.forecast.forecastday);
  return (
    <div className="z-10 border-solid border border-blue-300 rounded bg-slate-100">
      <div>
        {TbilisiWeather ? (
          <div className="grid grid-cols-7 text-center">
            {TbilisiWeather.forecast.forecastday.map((item) => {
              return (
                <div key={item.date}>
                  <img src={item.day.condition.icon} alt="weather icon" />
                  <div className="flex gap-1 justify-center">
                    {item.date.split("-").slice(-1)}
                    <span>
                      <p>{currentMonth}</p>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
