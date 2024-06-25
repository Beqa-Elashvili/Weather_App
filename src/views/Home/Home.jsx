import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import { WeatherByDay } from "@src/Components/HomeComponents/MainWeatherByDay";
import { useRef, useEffect } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { Skeleton } from "antd";
import { WeatherDayCostumize } from "@src/Components/HomeComponents/WeatherByDays";

export function Home() {
  const videoRef = useRef(null);
  const { loading, weather } = useGlobalProvider();
  const SkeletonArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];


  return (
    <div>
      {loading ? (
        <div className="p-12 flex justify-between">
          <div className="w-80 flex flex-col gap-2">
            <Skeleton.Input active />
            <Skeleton
              active
              paragraph={{ rows: 0, width: ["100%", "100%", "100%"] }}
            />
            <Skeleton active paragraph={{ rows: 2, width: ["100%", "100%"] }} />
            <div className="flex gap-1">
              <Skeleton.Image active />
              <Skeleton.Image active />
              <Skeleton.Image active />
            </div>
          </div>
          <div>
            <div className="flex gap-12">
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active />
              <Skeleton.Input active />
            </div>
            <div className="flex gap-12 mt-1">
              {SkeletonArray.map((item) => (
                <Skeleton
                  key={item.id}
                  active
                  paragraph={{
                    rows: 4,
                    width: ["50%", "50%", "100%", "100%"],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            src={weather}
            className="absolute w-full z-0"
          />
          <div className="flex flex-col gap-12 p-12 ">
            <div className="flex items-start justify-between">
              <HomeWeather />
              <WeatherByDay />
            </div>
            <div className="z-10">
              <WeatherDayCostumize />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
