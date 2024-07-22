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
    <div className="p-2 lg:px-12  mt-8">
      {loading ? (
        <div className="p-12 block lg:flex lg:justify-between">
          <div className="hidden sm:hidden md:flex justify-between">
            <div className="w-80 flex flex-col items-center gap-2">
              <Skeleton.Input active />
              <Skeleton
                active
                paragraph={{ rows: 0, width: ["100%", "100%", "100%"] }}
              />
              <Skeleton
                active
                paragraph={{ rows: 2, width: ["100%", "100%"] }}
              />
              <div className="flex gap-1">
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
              </div>
            </div>
            <div className="block lg:hidden">
              <div className="flex gap-12">
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
          <div className="block md:hidden ">
            <div className="w-80  flex flex-col items-center gap-2">
              <Skeleton.Input active />
              <Skeleton
                active
                paragraph={{ rows: 0, width: ["100%", "100%", "100%"] }}
              />
              <Skeleton
                active
                paragraph={{ rows: 2, width: ["100%", "100%"] }}
              />
              <div className="flex gap-1">
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
              </div>
            </div>
            <div className="w-80 mt-12 flex flex-col items-center gap-2">
              <Skeleton.Input active />
              <Skeleton
                active
                paragraph={{ rows: 0, width: ["100%", "100%", "100%"] }}
              />
              <Skeleton
                active
                paragraph={{ rows: 2, width: ["100%", "100%"] }}
              />
              <div className="flex gap-1">
                <Skeleton.Image active />
                <Skeleton.Image active />
                <Skeleton.Image active />
              </div>
            </div>
          </div>
          <div className="hidden md:flex lg:flex flex-col gap-12">
            <div className="hidden lg:block">
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
            <div className="hidden lg:block">
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
            <div className="hidden mt-12 md:block lg:hidden">
              <div className="flex gap-12">
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
      )}
    </div>
  );
}
