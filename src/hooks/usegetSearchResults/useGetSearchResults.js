import axios from "axios";
import { useState } from "react";

export function useGetSearchResult() {
  const [SearchLoading, setSearchLoading] = useState(false);

  async function GetSearchResult(value, setSearchResult) {
    try {
      setSearchLoading(true);
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=91a6e75e56dc4dad8e192202241306&q=${value}`
      );
      setSearchResult(resp.data);
      setSearchLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setSearchLoading(false);
    }
  }

  return { GetSearchResult, SearchLoading };
}
