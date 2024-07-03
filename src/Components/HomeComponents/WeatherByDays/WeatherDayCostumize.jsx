import useGlobalProvider from "@src/Providers/useGlobalProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import { FcElectricity } from "react-icons/fc";
import { useGetIcons } from "@src/hooks/useGetIcons";

export function WeatherDayCostumize() {
  const { currentFormat, handleCurrentMonth, currentWeathers } =
    useGlobalProvider();
  const { getIcons } = useGetIcons();

  return (
    <div>
      <div className="grid grid-cols-7 text-center gap-2"></div>
    </div>
  );
}
