import { createContext, useContext } from "react";
import useLighthouseUserService from "../useLighthouseUserService";

const AppContext = createContext();

const AppContextProvider = function ({ children }) {
  const userServices = useLighthouseUserService();

  const model = {
    ...userServices,
  };

  return <AppContext.Provider value={model}>{children}</AppContext.Provider>;
};

const useAppContext = function () {
  return useContext(AppContext);
};

export { useAppContext, AppContextProvider };
