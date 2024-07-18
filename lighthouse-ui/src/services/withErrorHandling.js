//Unset user from local storage and dispatch a 401Error
//that may be dealt with by a hook responsible for managing user state
const handle401Error = () => {
  localStorage.removeItem(`user`);
  document.dispatchEvent(new CustomEvent("401Error"));
};

/**
 * Wraps API calls with error handling logic.
 * @param {Function} apiCall - The API call to be executed.
 * @returns {Promise} - A promise that resolves with the result of the API call, or rejects with an error.
 */
const withErrorHandling = async (apiCall) => {
  try {
    return await apiCall();
  } catch (err) {
    if (err?.response?.status === 401) handle401Error();
    throw err?.response?.data ?? err;
  }
};

export default withErrorHandling;
