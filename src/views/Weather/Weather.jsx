import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCurrentWeathers } from "@src/hooks/useGetCurrentWeathers";
import { GetCurrentTime } from "@src/Components/CurrentTime";

export function Weathers() {
  const { GetTbilisiWeather } = useGlobalProvider();
  const { GetCurrentWeathers } = useGetCurrentWeathers();
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
        <div className="flex flex-col gap-12 p-12">
          <div className="z-10">
            <GetCurrentTime />
          </div>
        </div>
      </>
    </div>
  );
}
