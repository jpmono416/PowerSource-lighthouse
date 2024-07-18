import axios from "axios";

import withErrorHandling from "./withErrorHandling";

axios.defaults.withCredentials = true;

const dummyUser = {
  id: 1,
  username: "test user",
  emailAddress: "test@user.com",
};

/**
 * Registers a new user.
 * @param {Object} newUserSubmission - The user submission data.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 */
export const register = async (newUserSubmission) => {
  return await withErrorHandling(async () => {
    return dummyUser;
  });
};

/**
 * Sign in a user with the provided credentials.
 *
 * @param {Object} userCredentials - The user credentials.
 * @param {string} userCredentials.username - The username of the user.
 * @param {string} userCredentials.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 */
export const signIn = async (userCredentials) => {
  return await withErrorHandling(async () => {
    const response = {
      data: { dummyUser },
    };
    localStorage.setItem(`user`, JSON.stringify(response.data));
    return response.data;
  });
};

/**
 * Signs out the user
 * @returns {Promise<void>} A promise that resolves when the sign-out process is complete.
 */
export const signOut = async () => {
  return await withErrorHandling(async () => {
    localStorage.removeItem(`user`);
  });
};

/**
 * Retrieves the active user from the local storage.
 * @returns {Object|null} The active user object, or null if no active user is found.
 */
export const getActiveUser = () => {
  return JSON.parse(localStorage.getItem(`user`));
};
