import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentWeathers } from "@src/hooks/useGetCurrentWeathers";
import { useGetMainWeather } from "@src/hooks/useGetmainWeather/useGetMainWeather";
import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import { CarouselWithDays } from "@src/Components/CarouselWithDays";
import { CarouselWithHours } from "@src/Components/CarouselWithHours";
import { MapContent } from "@src/Components/MapView";

export function Weathers() {
  const { GetCurrentWeathers } = useGetCurrentWeathers();
  const { GetWeatherByCity } = useGetMainWeather();
  const { currentFormat } = useGlobalProvider();

  let { City } = useParams();

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
    <div className="px-12 mt-8">
      <div className="bg-slate-800 bg-opacity-70 flex flex-col gap-12 z-0 p-6 rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <HomeWeather />
            <div className="flex flex-col gap-4">
              <CarouselWithHours />
              <CarouselWithDays />
            </div>
          </div>
          <MapContent />
        </div>
      </div>
    </div>
  );
}
