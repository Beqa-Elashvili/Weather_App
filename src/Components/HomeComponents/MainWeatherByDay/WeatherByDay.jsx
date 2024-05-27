import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/Providers/GlobalContext";

export function WeatherByDay() {
  const { TbilisiWeather, currentWeekDay } = useContext(GlobalContext);
  return (
    <div>
      <h1>{currentWeekDay}</h1>
    </div>
  );
}
