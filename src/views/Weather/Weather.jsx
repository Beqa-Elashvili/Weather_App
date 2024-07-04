import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentWeathers } from "@src/hooks/useGetCurrentWeathers";
import { GetCurrentTime } from "@src/Components/CurrentTime";
import { useGetMainWeather } from "@src/hooks/useGetmainWeather/useGetMainWeather";
import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import { CarouselWithDays } from "@src/Components/CarouselWithDays";
import { CarouselWithHours } from "@src/Components/CarouselWithHours";

export function Weathers() {
  const { GetWeatherByCity } = useGetMainWeather();
  const { GetCurrentWeathers } = useGetCurrentWeathers();
  let { City } = useParams();
  const { currentFormat } = useGlobalProvider();
  console.log(currentFormat)

  useEffect(() => {
    if (City) {
      GetCurrentWeathers(City);
      GetWeatherByCity(City);
    }
  }, [City]);

  useEffect(() => {
    GetCurrentWeathers(City);
  }, [currentFormat]);

  return (
    <div className="bg-slate-800 bg-opacity-70 flex flex-col gap-12 z-0 p-6 rounded-xl">
      <div className="flex justify-between gap-6">
        <HomeWeather />
        <div className="flex flex-col gap-4">
          <CarouselWithHours />
          <CarouselWithDays />
        </div>
      </div>
    </div>
  );
}
