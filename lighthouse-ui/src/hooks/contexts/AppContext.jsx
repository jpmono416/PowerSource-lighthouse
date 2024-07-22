import { createContext, useContext, useEffect, useState } from "react";
import useLighthouseUserService from "../useLighthouseUserService";
import getScreenSize from "../../utils/getScreenSize";

const AppContext = createContext();

const AppContextProvider = function ({ children }) {
  const userServices = useLighthouseUserService();
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleUpdateScreenSize = () => {
      const currentScreenSize = getScreenSize();
      if (screenSize !== currentScreenSize) setScreenSize(currentScreenSize);
    };

    window.addEventListener("resize", handleUpdateScreenSize);
    return () => window.removeEventListener("resize", handleUpdateScreenSize);
  }, [screenSize]);

  const model = {
    ...userServices,
    screenSize,
  };

  return <AppContext.Provider value={model}>{children}</AppContext.Provider>;
};

const useAppContext = function () {
  return useContext(AppContext);
};

export { useAppContext, AppContextProvider };
