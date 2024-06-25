import React, { useEffect } from "react";
import useGlobalProvider from "@src/Providers/useGlobalProvider";

export function GetCurrentTime() {
  const { currentTime, setCurrentTime, timeZone } = useGlobalProvider();

  useEffect(() => {
    const updateTime = () => {
      const utcDate = new Date();
      const localDate = new Date(
        utcDate.toLocaleString("en-US", { timeZone: timeZone })
      );
      setCurrentTime(localDate);
    };
    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, [timeZone]);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return <div className="z-10">{formatTime(currentTime)}</div>;
}
