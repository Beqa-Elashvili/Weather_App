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
    <div className="p-2 mt-8 lg:px-12">
       <div className="bg-slate-800 relative bg-opacity-70 flex flex-col gap-12 z-0 p-4 lg:p-6 rounded-xl">
            <div className="flex flex-col w-full gap-4">
              <div className="gap-6 hidden lg:flex justify-between">
                <HomeWeather />
                <div className="flex flex-col lg:w-1/2 xl:w-full gap-4">
                  <CarouselWithHours />
                  <CarouselWithDays />
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:hidden">
                <HomeWeather />
                <CarouselWithHours />
                <CarouselWithDays />
              </div>
              <MapContent />
            </div>
          </div>
    </div>
  );
}
