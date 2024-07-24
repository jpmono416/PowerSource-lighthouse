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

export const getLLMById = async (id) => {
  let url = `${llmEndpointRoot}/${id}`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export const getLLMCatalogueFilterOptions = async (queryString) => {
  let url = `${llmEndpointRoot}/filters`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};

export const createLLM = async (payload) => {
  let url = `${llmEndpointRoot}/`;
  return await withErrorHandling(async () => {
    const response = await axios.post(url, payload);
    return response.data;
  });
};

export const getMatrix = async () => {
  let url = `${llmEndpointRoot}/matrix`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};
