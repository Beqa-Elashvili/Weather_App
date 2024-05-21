import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@src/Providers/GlobalContext";
import { HomeWeather } from "@src/Components/HomeWeather";

 export function Home() {
  const [value, setValue] = useState("");
  const { weathers, setWeathers } = useContext(GlobalContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threeWeather, setThreeWeather] = useState({
    weathersData: [],
  });

  async function getOneWeather(city) {
    try {
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=449a4e9f33e1414cbdf154018241905&q=${city}&aqi=yes`
      );
      setWeathers((prevUser) => ({
        ...prevUser,
        weatherData: [...prevUser.weatherData, resp.data],
      }));
      setValue("");
    } catch (error) {
      alert(error.response.data.error.message, "Please input it correctly");
    } finally {
      setValue("");
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getOneWeather(value);
      setValue("");
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="p-20 flex justify-between">
      <HomeWeather />
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-red-400 hover:cursor-pointer">
          See How is Your Weather!
        </h1>
        <div className="flex flex-col gap-1">
          <input
            className="p-2 rounded border border-yellow-400"
            type="text"
            placeholder="Enter city or country"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="text-lg p-1 rounded border border-yellow-400 bg-orange-400 text-orange-800 cursor-pointer"
            onClick={() => getOneWeather(value)}
          >
            Search
          </button>
          <div>{formatTime(currentTime)}</div>
        </div>
        <div className="grid grid-cols-3 gap-x-12">
          {weathers.weatherData.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div>
                  <h1 className="text-center">{item.location.name}</h1>
                  <h2 className="text-center">
                    {" "}
                    country: {item.location.country}
                  </h2>

                  <h1>
                    <span className="text-orange-400">temp_c</span>{" "}
                    {item.current.temp_c}
                    <span className="text-yellow-400">c</span>
                  </h1>
                  <h1>
                    <span className="text-orange-400">temp_f</span>{" "}
                    {item.current.temp_f}
                    <span className="text-yellow-400">f</span>
                  </h1>
                </div>
                <div className="inline-flex flex-col items-center border-solid border border-yellow-400 rounded-xl p-2 min-w-40">
                  <img src={item.current.condition.icon} alt="" />
                  <p>{item.current.condition.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
