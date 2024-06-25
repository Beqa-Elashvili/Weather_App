import axios from "axios";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

export function useGetCurrentWeathers() {
  const {
    formattedStartDate,
    formattedEndDate,
    currentFormat,
    setCurrentWeathers,
  } = useGlobalProvider();
  async function GetCurrentWeathers(city) {
    try {
      const handleFormat = currentFormat.Speed === "kph" ? "metric" : "us";
      const resp = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedStartDate}/${formattedEndDate}?unitGroup=${handleFormat}&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
      );
      setCurrentWeathers(resp.data.days);
    } catch (error) {
      console.error(error);
    }
  }
  return { GetCurrentWeathers };
}
