import axios from "axios";
import { useState } from "react";

function App() {
  const [OneWeather, setOneWeather] = useState(null);
  const [value, setValue] = useState("");

  async function getOneWeather(city) {
    try {
      const resp = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=449a4e9f33e1414cbdf154018241905&q=${city}&aqi=yes`
      );
      setOneWeather(resp.data);
    } catch (error) {
      alert(error.response.data.error.message, "Please input it correctly");
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getOneWeather(value);
    }
  };

  return (
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
      </div>
      {OneWeather !== null && (
        <>
          <div>
            <h1 className="text-center">{OneWeather.location.name}</h1>
            <h2 className="text-center">
              {" "}
              country: {OneWeather.location.country}
            </h2>
            <h1>
              <span className="text-orange-400">temp_c</span>{" "}
              {OneWeather.current.temp_c}
              <span className="text-yellow-400">c</span>
            </h1>
            <h1>
              <span className="text-orange-400">temp_f</span>{" "}
              {OneWeather.current.temp_f}
              <span className="text-yellow-400">f</span>
            </h1>
          </div>
          <div className="inline-flex flex-col items-center border-solid border border-yellow-400 rounded-xl p-2 min-w-40">
            <img src={OneWeather.current.condition.icon} alt="" />
            <p>{OneWeather.current.condition.text}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
