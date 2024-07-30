import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";

import { useAppContext } from "./contexts/AppContext";
import QueryStringBuilder from "../utils/QueryStringBuilder";
import * as llmService from "../services/llm.service";

export default function useLLMCatalogueService() {
  const [results, setResults] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [lastAction, setLastAction] = useState("");
  const [queryString, setQueryString] = useState("");
  const [queryValues, setQueryValues] = useState({});

  const { activeUser } = useAppContext();
  const { pathname } = useLocation();

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
    return errorMessages;
  };

  const getLLMs = async () => {
    try {
      setLastAction("getLLMs");
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

  const getLLMById = async (id) => {
    try {
      setLastAction("getLLMById");
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.getLLMById(id);
      return response;
    } catch (err) {
      return { errors: handleErrors(err) };
    } finally {
      setIsLoading(false);
    }
  };

  const getFilterOptions = async () => {
    try {
      setLastAction("getFilterOptions");
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

  const createLLM = async (submission) => {
    try {
      setLastAction("createLLM");
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.createLLM(submission);
      await getFilterOptions();
      await getLLMs();
      return response;
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const editLLM = async (id, updates) => {
    try {
      setLastAction("editLLM");
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.editLLM(id, updates);
      await getFilterOptions();
      await getLLMs();
      return response;
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getMatrix = async () => {
    try {
      setLastAction("getMatrix");
      setErrors(null);
      setIsLoading(true);
      const response = await llmService.getMatrix();
      return response;
    } catch (err) {
      handleErrors(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQueryValueFor = (field, value) => {
    const formattedValue = value.toString().trim();
    queryStringBuilder.setFilter(field, formattedValue);
    setQueryString(queryStringBuilder.getQueryString());
    setQueryValues(queryStringBuilder.getQueryValues());
  };

  const initialiseData = async () => {
    const filters = await getFilterOptions();
    if (!filters) return;
    await getLLMs();
  };

  useEffect(() => {
    setErrors(null);
  }, [pathname]);

  useEffect(() => {
    if (!activeUser) return;
    initialiseData();
  }, [activeUser]);

  return {
    createLLM,
    editLLM,
    errors,
    getLLMs,
    getLLMById,
    getMatrix,
    isLoading,
    filterOptions,
    lastAction,
    queryString,
    queryValues,
    refreshResults,
    results,
    updateQueryValueFor,
  };
}
