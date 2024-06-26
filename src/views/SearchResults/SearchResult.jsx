import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useGetSearchResult } from "@src/hooks/usegetSearchResults";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function SearchResults() {
  const { GetSearchResult } = useGetSearchResult();
  const [results, setResults] = useState([]);
  const { City } = useParams();

  useEffect(() => {
    if (City) {
      GetSearchResult(City, setResults);
    }
  }, []);

  console.log(results);

  return (
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        src="../../videos/good weather.mp4"
        className="absolute w-full z-0"
      />
      <div className="relative">
        <div>fggrhgrhgfhgd</div>
      </div>
    </div>
  );
}
