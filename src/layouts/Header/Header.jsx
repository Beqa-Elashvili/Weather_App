import { Select, Input, Button } from "antd";
import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useEffect, useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

export function Header() {
  const { toggleFormat, letCurrent, setLetCurrent, GetTbilisiWeather } =
    useGlobalProvider();
  const [rotateIcon, setRotateIcon] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const handleRotateIcon = () => {
    toggleFormat();
    setRotateIcon(!rotateIcon);
  };

  async function getCitysBySearch() {
    const resp = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=91a6e75e56dc4dad8e192202241306&q=${searchValue}`
    );
    setSearchResult(resp.data);
  }

  console.log(searchResult);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCitysBySearch();
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  return (
    <div className="p-2 px-12 bg-blue-300 flex items-center gap-12">
      <img className="size-12" src="/ApiLogo/Api-logo.png" alt="" />
      <Select placeholder="City" className="min-w-28">
        <Select.Option value="Tbilisi">Tbilisi</Select.Option>
        <Select.Option value="Batumi">Batumi</Select.Option>
        <Select.Option value="Kutaisi">Kutaisi</Select.Option>
        <Select.Option value="Rustavi">Rustavi</Select.Option>
        <Select.Option value="Zugdidi">Zugdidi</Select.Option>
        <Select.Option value="Poti">Poti</Select.Option>
        <Select.Option value="Gori">Gori</Select.Option>
        <Select.Option value="Samtredia">Samtredia</Select.Option>
        <Select.Option value="Khashuri">Khashuri</Select.Option>
        <Select.Option value="Senaki">Senaki</Select.Option>
      </Select>
      <div className="w-full relative">
        <Input
          placeholder="Search the City"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={GetTbilisiWeather}
          className="p-[5px] h-[30px] absolute right-[1px] top-[1px] top-[2%] rounded-r-[5px] border-none"
        >
          <IoSearchOutline className="w-12 h-5 cursor-pointer " />
        </button>
        <div className="text-white p-2 bg-blue-100 w-full overflow-x-auto rounded max-h-60 absolute z-20 flex flex-col gap-2">
          {searchResult?.map((item, index) => (
            <div
              className={
                index % 2 === 0 ? "bg-indigo-500 rounded p-2" : "bg-sky-500 p-2 rounded"
              }
              key={item.id}
            >
              <p>
                <span>City?: </span>
                {item.name}
              </p>
              <p>{item.country}</p>
            </div>
          ))}
        </div>
      </div>
      <Button className="flex items-center gap-2" onClick={handleRotateIcon}>
        Change Format
        <FaArrowsRotate
          className="text-blue-400"
          style={{
            height: 20,
            width: 30,
            transition: "transform 1s ease",
            transform: rotateIcon ? "rotate(360deg)" : "rotate(0deg)",
          }}
        />
      </Button>
    </div>
  );
}
