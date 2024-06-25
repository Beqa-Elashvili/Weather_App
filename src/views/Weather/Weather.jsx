import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentWeathers } from "@src/hooks/GetCurrentWeathers";
import { GetCurrentTime } from "@src/Components/CurrentTime";
export function Weathers() {
  const { weather, CurrentTime, GetTbilisiWeather } = useGlobalProvider();
  const { GetCurrentWeathers } = useGetCurrentWeathers();

  const videoRef = useRef(null);
  let { City } = useParams();

  useEffect(() => {
    if (City) {
      GetCurrentWeathers(City);
      GetTbilisiWeather(City);
    }
  }, [City]);

  return (
    <div>
      <>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          src={weather}
          className="absolute w-full z-0"
        />
        <div className="flex flex-col gap-12 p-12">
          <div className="z-10">
            <GetCurrentTime />
          </div>
        </div>
      </>
    </div>
  );
}
