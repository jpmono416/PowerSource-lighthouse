import axios from "axios";
import withErrorHandling from "./withErrorHandling";
import catalogueData from "../dummyData/catalogueData";

// axios.defaults.withCredentials = true;

const llmEndpointRoot = `${import.meta.env.VITE_APP_API_ROOT}/llm`;

export const getLLMs = async (queryString) => {
  let url = `${llmEndpointRoot}${queryString}`;
  return await withErrorHandling(async () => {
    const response = await axios.get(url);
    return response.data;
  });
};
