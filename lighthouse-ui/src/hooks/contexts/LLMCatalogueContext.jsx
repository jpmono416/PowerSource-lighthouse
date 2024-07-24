import { createContext, useContext } from "react";
import useLLMCatalogueService from "../useLLMCatalogueService";

const LLMCatalogueContext = createContext();

const LLMCatalogueContextProvider = function ({ children }) {
  const LLMCatalogueServices = useLLMCatalogueService();

  const model = {
    ...LLMCatalogueServices,
  };

  return (
    <LLMCatalogueContext.Provider value={model}>
      {children}
    </LLMCatalogueContext.Provider>
  );
};

const useLLMCatalogueContext = function () {
  return useContext(LLMCatalogueContext);
};

export { useLLMCatalogueContext, LLMCatalogueContextProvider };
