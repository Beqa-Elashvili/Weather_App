import useGlobalProvider from "@src/Providers/useGlobalProvider";
import axios from "axios";

export function useGetSearchResult() {
  async function GetSearchResult(value, setSearchResult) {
    try {
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=91a6e75e56dc4dad8e192202241306&q=${value}`
      );
      setSearchResult(resp.data);
    } catch (error) {
      alert(error.message);
    }
  }

  return { GetSearchResult };
}
