import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import { WeatherByDay } from "@src/Components/HomeComponents/MainWeatherByDay";

export function Home() {
  return (
    <div className="p-20 flex items-start justify-between">
      <HomeWeather />
      <WeatherByDay />
    </div>
  );
}
