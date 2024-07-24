import validator from "validator";

export default class UserDetailsValidator {
  static #validators = {
    username: UserDetailsValidator.validateUsername,
    email: UserDetailsValidator.validateEmailAddress,
    password: UserDetailsValidator.validatePassword,
    confirmPassword: UserDetailsValidator.validateConfirmPassword,
  };

  /** Get validators dictionary which maps field names to a validator
   * @returns {Object} The validators dictionary.
   */
  static get validators() {
    return this.#validators;
  }

  /**
   * Checks if the submission object is valid based on the defined validators.
   *
   * @param {Object} submission - The submission object to be validated.
   * @returns {boolean} - Returns true if the submission is valid, false otherwise.
   */
  static isValidated(submission) {
    for (const key in submission) {
      const validator = UserDetailsValidator.validators[key];
      if (!validator || !validator(submission[key], submission.password)[0])
        return false;
    }
    return true;
  }

  /**
   * Validates a username.
   *
   * @param {string} username - The username to be validated.
   * @returns {Array} An array containing a boolean value indicating whether the username is valid,
   * and an optional error message if the username is invalid.
   */
  static validateUsername(username) {
    if (username.length < 8)
      return [false, "Username must be at least 8 characters"];
    if (username.length > 24)
      return [false, "Username must be no more than 24 characters"];
    return [true];
  }

  /**
   * Validates an email address.
   *
   * @param {string} emailAddress - The email address to validate.
   * @returns {Array} - An array containing a boolean value indicating whether the email address is valid,
   *                    and an optional error message if the email address is invalid.
   */
  static validateEmailAddress(emailAddress) {
    if (emailAddress.trim().length === 0)
      return [false, "Email address is required"];
    if (!validator.isEmail(emailAddress))
      return [false, "Email address is invalid"];
    return [true];
  }

  /**
   * Validates a password based on certain criteria.
   * @param {string} password - The password to be validated.
   * @returns {Array} - An array containing a boolean value indicating whether the password is valid,
   *                    and an optional error message if the password is invalid.
   */
  static validatePassword(password) {
    if (password.length < 8)
      return [false, "Password must be at least 8 characters"];
    if (password.length > 32)
      return [false, "Password must be no more than 32 characters"];
    if (!password.match(/\d/))
      return [false, "Password must contain at least one digit"];
    if (!password.match(/[!@#$£%&?]/))
      return [false, "Password must contain at least one special character"];
    return [true];
  }

  /**
   * Validates the confirmation password against the original password.
   *
   * @param {string} password - The original password.
   * @param {string} confirmPassword - The confirmation password.
   * @returns {Array} - An array containing a boolean indicating whether the passwords match, and an optional error message.
   */
  static validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) return [false, "Passwords do not match"];
    return [true];
  }
}
