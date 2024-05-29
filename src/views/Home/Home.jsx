import { HomeWeather } from "@src/Components/HomeComponents/HomeWeather";
import { WeatherByDay } from "@src/Components/HomeComponents/MainWeatherByDay";
import { useRef, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "@src/Providers/GlobalContext";
import { SearchFunction } from "@src/Components/SearchFunctional";

export function Home() {
  const videoRef = useRef(null);
  const { currentVideo } = useContext(GlobalContext);

  let weather = "";

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }
  }, []);

  switch (currentVideo) {
    case "good":
      weather = "./videos/good weather.mp4";
      break;
    case "middle":
      weather = "./videos/middle weather.mp4";
      break;
    case "bad":
      weather = "./videos/bad weather.mp4";
      break;
    case "mist":
      weather = "./videos/mist weather.mp4";
      break;
    case "high snow":
      weather = "./videos/high snow.mp4";
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        src={weather}
        className="absolute w-full z-0"
      ></video>
      <div className="z-10 p-12 flex justify-between">
        <HomeWeather />
        <WeatherByDay />
      </div>
    </div>
  );
}
