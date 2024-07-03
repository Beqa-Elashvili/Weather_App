import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import { Carousel } from "antd";
import { useGetIcons } from "@src/hooks/useGetIcons";

export function CarouselWithDays() {
  const { getIcons } = useGetIcons();
  const { currentFormat, handleCurrentMonth, currentWeathers } =
    useGlobalProvider();
  return (
    <div className="flex gap-2 relative">
      <div className="p-2 flex gap-12 w-full">
        <Carousel
          itemsToShow={8}
          itemsToScroll={1}
          speed={400}
          easing="linear"
          forwardBtnProps={{
            className:
              "border-none h-full opacity-0 cursor-pointer  hover:opacity-20 absolute top-1/2 right-0 transform -translate-y-1/2  ",
            children: (
              <h1 className="p-2 bg-slate-400 h-full flex items-center text-white ">{`>`}</h1>
            ),
          }}
          backwardBtnProps={{
            className:
              "border-none opacity-0 cursor-pointer z-10 h-full hover:opacity-20 absolute top-1/2 left-0 transform -translate-y-1/2  ",
            children: (
              <h1 className="p-2 bg-slate-400 h-full flex items-center   text-white  ">{`<`}</h1>
            ),
          }}
        ></Carousel>
      </div>
    </div>
  );
}
