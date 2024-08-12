import axios from "axios";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

export function useGetCurrentWeathers() {
  const { currentFormat, setCurrentWeathers } = useGlobalProvider();

  async function GetCurrentWeathers(city, startDate, endDate) {
    try {
      const handleFormat = currentFormat.Speed === "kph" ? "metric" : "us";
      const resp = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=${handleFormat}&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
      );
      setCurrentWeathers(resp.data.days);
    } catch (error) {
      alert(
        `${error.response.data
          .split(" ")
          .slice(0, 13)
          .join(" ")} please try again later.`
      );
      setCurrentWeathers([]);
    }
  }

  return { GetCurrentWeathers };
}
