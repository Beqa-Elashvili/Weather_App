import axios from "axios";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

export function useGetCurrentWeathers() {
  const {
    formattedStartDate,
    formattedEndDate,
    currentFormat,
    setCurrentWeathers,
  } = useGlobalProvider();
  async function GetCurrentWeathers(city, startDate, endDate) {
    try {
      const handleFormat = currentFormat.Speed === "kph" ? "metric" : "us";
      if (!startDate && !endDate) {
        console.log("gaeshva");
        const resp = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedStartDate}/${formattedEndDate}?unitGroup=${handleFormat}&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
        );
        setCurrentWeathers(resp.data.days);
      } else {
        console.log(startDate,endDate);
        const resp = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=${handleFormat}&key=UZX2S8964NKCR42RGD2KYW4WG&contentType=json`
        );
        setCurrentWeathers(resp.data.days);
      }
    } catch (error) {
      alert(
        `${error.message}. Bad API Request:Invalid location parameter value. Forecast Days isn't avaliable on this location`
      );
      setCurrentWeathers([]);
    }
  }

  return { GetCurrentWeathers };
}
