import { afterEach, beforeEach, expect } from "vitest";

import UserDetailsValidator from "../../../src/utils/validators/UserDetailsValidator";

describe("Register tests: ", () => {
  let testSubmission;

  beforeEach(() => {
    testSubmission = {
      username: "test-user",
      emailAddress: "test@email.com",
      password: "password12$",
      confirmPassword: "password12$",
    };
  });

  afterEach(() => {
    testSubmission = null;
  });

  //? TEST:
  test("It should return true from isValidated where all active fields are valid", () => {
    //Act
    const actual = UserDetailsValidator.isValidated(testSubmission);
    //Assert
    expect(actual).toBe(true);
  });

  //? TEST:
  test("It should return an error where the username is less than 8 characters", () => {
    //Arrange
    const testInvalidUsername = "xxx-xxx";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validateUsername(testInvalidUsername);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/username must be at least 8 characters/i);
  });

  //? TEST:
  test("It should return an error where the username is more than 24 characters", () => {
    //Arrange
    const testInvalidUsername = "x".repeat(12) + "-" + "x".repeat(12);
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validateUsername(testInvalidUsername);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/username must be no more than 24 characters/i);
  });

  //? TEST:
  test("It should return true where the username is valid", () => {
    //Arrange
    const testValidUsername = "test-username";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validateUsername(testValidUsername);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //? TEST:
  test("It should return an error where the email is empty", () => {
    //Arrange
    const testInvalidEmailAddress = "  ";
    //Act
    const [isValidated, error] = UserDetailsValidator.validateEmailAddress(
      testInvalidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/email address is required/i);
  });

  //? TEST:
  test("It should return an error where the email is invalid", () => {
    //Arrange
    const testInvalidEmailAddress = "test.invalidEmailAddress.com";
    //Act
    const [isValidated, error] = UserDetailsValidator.validateEmailAddress(
      testInvalidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/email address is invalid/i);
  });

  //? TEST:
  test("It should return true where the emailAddress is valid", () => {
    //Arrange
    const testValidEmailAddress = "test@validEmailAddress.com";
    //Act
    const [isValidated, error] = UserDetailsValidator.validateEmailAddress(
      testValidEmailAddress
    );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //? TEST:
  test("It should return an error where the password is less than 8 characters", () => {
    //Arrange
    const testInvalidPassword = "xxxxx1$";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must be at least 8 characters/i);
  });

  //? TEST:
  test("It should return an error where the password is more than 32 characters", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(31) + "1$";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must be no more than 32 characters/i);
  });

  //? TEST:
  test("It should return an error where the password does not contain at least one digit", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(7) + "$";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/password must contain at least one digit/i);
  });

  //? TEST:
  test("It should return an error where the password does not contain at least one special character", () => {
    //Arrange
    const testInvalidPassword = "x".repeat(7) + "1";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validatePassword(testInvalidPassword);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(
      /password must contain at least one special character/i
    );
  });

  //? TEST:
  test("It should return true where the password is valid", () => {
    //Arrange
    const testValidPassword = "x".repeat(7) + "1$";
    //Act
    const [isValidated, error] =
      UserDetailsValidator.validatePassword(testValidPassword);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //? TEST:
  test("It should return false where password and confirmPassword do not match", () => {
    //Act
    const [isValidated, error] = UserDetailsValidator.validateConfirmPassword(
      "a",
      "b"
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/passwords do not match/i);
  });

  //? TEST:
  test("It should return true where password and confirmPassword do match", () => {
    //Act
    const [isValidated, error] = UserDetailsValidator.validateConfirmPassword(
      "a",
      "a"
    );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBe(undefined);
  });

  //? TEST:
  test("It should return false from isValidated where one field is invalid", () => {
    //Arrange
    testSubmission.password = "invalidPassword";
    //Act
    const actual = UserDetailsValidator.isValidated(testSubmission);
    //Assert
    expect(actual).toBe(false);
  });
});
