import useGlobalProvider from "@src/Providers/useGlobalProvider";
import axios from "axios";

export function useGetMainWeather() {
  const { setTbilisiWeather, setLoading, setTimeZone } = useGlobalProvider();

  async function GetWeatherByCity(City) {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=91a6e75e56dc4dad8e192202241306&lang=en&q=${City}&days=7&aqi=yes`
      );
      setTbilisiWeather(resp.data);
      const timeZone = resp.data.location.tz_id;
      setTimeZone(timeZone);
      setLoading(false);
    } catch (error) {
      alert(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  }
  return { GetWeatherByCity };
}
