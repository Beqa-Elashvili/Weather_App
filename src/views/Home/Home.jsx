import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { Skeleton } from "antd";
import { CarouselWithHours } from "@src/Components/CarouselWithHours";
import { CarouselWithDays } from "@src/Components/CarouselWithDays";
import { MapContent } from "@src/Components/MapView";

export function Home() {
  const { loading } = useGlobalProvider();
  const SkeletonArray = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  return (
    <div className="px-12 mt-8">
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
          <div className="flex flex-col gap-12">
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
            </div>{" "}
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
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
