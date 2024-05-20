import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [weathers, setWeathers] = useState({
    weatherData: []
  });

  return (
    <GlobalContext.Provider value={{ weathers, setWeathers }}>
      {children}
    </GlobalContext.Provider>
  );
};
