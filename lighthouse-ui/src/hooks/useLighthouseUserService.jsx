import { useEffect, useState } from "react";

import {
  getActiveUser,
  register,
  signIn,
  signOut,
} from "../services/authentication.service";

export default function useLighthouseUserService() {
  const [activeUser, setActiveUser] = useState(getActiveUser());
  const [authenticationIsLoading, setAuthenticationIsLoading] = useState(false);
  const [authenticationErrors, setAuthenticationErrors] = useState(null);
  const [lastActionName, setLastActionName] = useState("");

  //Listens for 401 error events thrown by any service. Where received
  //active user is set to null
  useEffect(() => {
    const handle401Error = () => {
      setActiveUser(null);
    };
    document.addEventListener("401Error", handle401Error);
    return () => document.removeEventListener("401Error", handle401Error);
  }, []);

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
    setAuthenticationErrors(errorMessages);
  };

  /**
   * Clears authentication errors.
   */
  const handleClearErrors = () => {
    setAuthenticationErrors(null);
  };

  /**
   * Registers a new user.
   *
   * @param {Object} newUserSubmission - The user submission data for registration.
   * @returns {Promise<Object>} - A promise that resolves to the newly registered user.
   */
  const registerNewUser = async (newUserSubmission) => {
    try {
      setLastActionName("register");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const newUser = await register(newUserSubmission);
      return newUser;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Sign in a user with the provided credentials.
   *
   * @param {object} userCredentials - The user credentials to sign in with.
   * @returns {Promise<object>} - A promise that resolves to the signed-in user.
   */
  const signInUser = async (userCredentials) => {
    try {
      setLastActionName("sign-in");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      const user = await signIn(userCredentials);
      setActiveUser(user);
      return user;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  /**
   * Signs out the user.
   * @returns {boolean} Returns true if the user is successfully signed out.
   */
  const signOutUser = async () => {
    try {
      setLastActionName("signOut");
      setAuthenticationErrors(null);
      setAuthenticationIsLoading(true);
      await signOut();
      setActiveUser(null);
      return true;
    } catch (err) {
      handleErrors(err);
    } finally {
      setAuthenticationIsLoading(false);
    }
  };

  return {
    authenticationErrors,
    authenticationIsLoading,
    activeUser,
    handleClearErrors,
    lastActionName,
    registerNewUser,
    signInUser,
    signOutUser,
  };
}
