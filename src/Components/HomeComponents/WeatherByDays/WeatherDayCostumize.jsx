import useGlobalProvider from "@src/Providers/useGlobalProvider";
export function WeatherDayCostumize() {
  const { TbilisiWeather, currentMonth } = useGlobalProvider();

  return (
    <div>
      {TbilisiWeather && (
        <div className="grid grid-cols-3 text-center gap-5">
          {TbilisiWeather.forecast.forecastday.map((item) => {
            return (
              <div
                className="z-10 border-solid border border-blue-300 rounded bg-blue-200 bg-opacity-50"
                key={item.date}
              >
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
      )}
    </div>
  );
}
