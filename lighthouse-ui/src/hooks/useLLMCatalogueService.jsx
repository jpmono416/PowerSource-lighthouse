import { useEffect, useMemo, useState } from "react";

import QueryStringBuilder from "../utils/QueryStringBuilder";
import * as llmService from "../services/llm.service";

export default function useLLMCatalogueService() {
  const [results, setResults] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [queryString, setQueryString] = useState("");
  const [queryValues, setQueryValues] = useState({});

  const queryStringBuilder = useMemo(() => new QueryStringBuilder(), []);

  /**
   * Handles errors returned from the server.
   *
   * @private
   * @param {Error|Array} err - The error object or array of error objects.
   */
  const handleErrors = (err) => {
    let errorMessages;
    if (Array.isArray(err)) errorMessages = err.map((err) => err.msg);
    else errorMessages = [err.message || err];
    setErrors(errorMessages);
  };

  const getLLMs = async () => {
    try {
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.getLLMs(queryString);
      setResults(response);
      return response;
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilterOptions = async () => {
    try {
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.getLLMCatalogueFilterOptions();
      setFilterOptions(response);
      return response;
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshResults = () => getLLMs();

  const updateQueryValueFor = (field, value) => {
    const formattedValue = value.toString().trim();
    queryStringBuilder.setFilter(field, formattedValue);
    setQueryString(queryStringBuilder.getQueryString());
    setQueryValues(queryStringBuilder.getQueryValues());
  };

  const initialiseData = async () => {
    await getFilterOptions();
    await getLLMs();
  };

  useEffect(() => {
    initialiseData();
  }, []);

  return {
    errors,
    getLLMs,
    isLoading,
    filterOptions,
    queryString,
    queryValues,
    refreshResults,
    results,
    updateQueryValueFor,
  };
}
