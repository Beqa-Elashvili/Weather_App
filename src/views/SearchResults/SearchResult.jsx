import { useGetSearchResult } from "@src/hooks/usegetSearchResults";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaTreeCity } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { IoEarth } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function SearchResults() {
  const { GetSearchResult } = useGetSearchResult();
  const [results, setResults] = useState([]);
  const { City } = useParams();
  const navigate = useNavigate();

  const handleSearchValue = (city) => {
    navigate(`/Weather/${city}`);
  };

  useEffect(() => {
    if (City) {
      GetSearchResult(City, setResults);
    }
  }, [City]);

  return (
    <div className="w-full">
      <video
        autoPlay
        loop
        muted
        src="../../videos/good weather.mp4"
        className="absolute w-full z-0 "
      />
      <div className="relative z-10 flex justify-center text-white gap-2 items-center p-12">
        <div className="flex flex-col gap-2 w-[80%]">
          {results?.map((item) => (
            <div
              className="flex items-center shadow w-full justify-between bg-blue-600 shadow-inner rounded p-2 cursor-pointer"
              key={item.id}
              onClick={() => handleSearchValue(item.name)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <FaTreeCity className="size-8 self-start" />
                  <p className="text-xl">{item.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <IoEarth className="size-8 self-start" />
                  <p className="text-xl">{item.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 flex flex-col gap-1">
                  <p className="bg-blue-100 text-blue-800 shadow-inner rounded-lg p-2 text-center">
                    <span className="float-start">lat: </span>
                    <span className="flex justify-end">{item.lat}</span>
                  </p>
                  <p className="bg-blue-100 text-blue-800 shadow-inner rounded-lg p-2 text-center">
                    <span className="float-start">lon: </span>
                    <span className="flex justify-end">{item.lon}</span>
                  </p>
                </div>
                <p className="mb-1">Get Weather</p>
                <MdArrowForwardIos />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
