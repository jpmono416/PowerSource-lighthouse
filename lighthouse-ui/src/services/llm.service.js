import axios from "axios";
import withErrorHandling from "./withErrorHandling";
import catalogueFilterData from "../dummyData/catalogueFilterData";

// axios.defaults.withCredentials = true;

const llmEndpointRoot = `${import.meta.env.VITE_APP_API_ROOT}/llm`;

export const getLLMs = async (queryString) => {
  let url = `${llmEndpointRoot}${queryString}`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export const getLLMCatalogueFilterOptions = async (queryString) => {
  let url = `${llmEndpointRoot}/filter-options`;
  return await withErrorHandling(async () => {
    const response = await new Promise((resolve, reject) => {
      resolve({ data: catalogueFilterData });
    });
    // const response = await axios.get(url);
    return response.data;
  });
};
