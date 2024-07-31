import { afterEach, beforeEach, expect } from "vitest";

import ModalDetailsValidator from "../../../src/utils/validators/ModalDetailsValidator";

describe("Model details validator tests: ", () => {
  let testSubmission;

  beforeEach(() => {
    testSubmission = {
      name: "test name",
      description: "A short description",
      modality: "text",
      organization: "SomeOrg",
      created_date: "2024-01-01",
      access: "open",
      license: "MIT",
      perceived_business_value: "50",
      business_readiness: "50",
    };
  });

  afterEach(() => {
    testSubmission = null;
  });

  //? TEST:
  test("It should return true where the name is between 3 and 24 characters", () => {
    //Arrange
    const testValidName = testSubmission.name;
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateName(testValidName);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the name is less than 3 characters", () => {
    //Arrange
    const testInvalidName = "xx";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateName(testInvalidName);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/name must be at least 3 characters/i);
  });

  //? TEST:
  test("It should return an error where the name is greater than 24 characters", () => {
    //Arrange
    const testInvalidName = "x".repeat(25);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateName(testInvalidName);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/name must be no more than 24 characters/i);
  });

  //? TEST:
  test("It should return true where the description is between 16 and 5000 characters", () => {
    //Arrange
    const testValidDescription = testSubmission.description;
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateDescription(testValidDescription);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the description is less than 16 characters", () => {
    //Arrange
    const testInvalidDescription = "x".repeat(15);
    //Act
    const [isValidated, error] = ModalDetailsValidator.validateDescription(
      testInvalidDescription
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/description must be at least 16 characters/i);
  });

  //? TEST:
  test("It should return an error where the description is greater than 5000 characters", () => {
    //Arrange
    const testInvalidDescription = "x".repeat(5001);
    //Act
    const [isValidated, error] = ModalDetailsValidator.validateDescription(
      testInvalidDescription
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/description must be no more than 5,000 characters/i);
  });

  //? TEST:
  test("It should return true where the modality is 0 characters", () => {
    //Arrange
    const testValidModality = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateModality(testValidModality);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true where the modality is not greater than 64 characters", () => {
    //Arrange
    const testValidModality = "x".repeat(64);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateModality(testValidModality);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the modality is greater than 64 characters", () => {
    //Arrange
    const testInvalidModality = "x".repeat(65);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateModality(testInvalidModality);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/modality must be no more than 64 characters/i);
  });

  //? TEST:
  test("It should return true where the organization is between 3 and 300 characters", () => {
    //Arrange
    const testValidOrganization = testSubmission.organization;
    //Act
    const [isValidated, error] = ModalDetailsValidator.validateOrganisation(
      testValidOrganization
    );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the organization is less than 3 characters", () => {
    //Arrange
    const testInvalidOrganization = "xx";
    //Act
    const [isValidated, error] = ModalDetailsValidator.validateOrganisation(
      testInvalidOrganization
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/organisation must be at least 3 characters/i);
  });

  //? TEST:
  test("It should return an error where the organization is greater than 300 characters", () => {
    //Arrange
    const testInvalidOrganization = "x".repeat(301);
    //Act
    const [isValidated, error] = ModalDetailsValidator.validateOrganisation(
      testInvalidOrganization
    );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/organisation must be no more than 300 characters/i);
  });

  //? TEST:
  test("It should return true where valid createdAt is provided", () => {
    //Arrange
    const tesValidCreatedAt = testSubmission.created_date;
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateCreatedAt(tesValidCreatedAt);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where no createdAt is provided", () => {
    //Arrange
    const testInvalidCreatedAt = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateCreatedAt(testInvalidCreatedAt);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/created at is required/i);
  });

  //? TEST:
  test("It should return an error where an invalid createdAt is provided", () => {
    //Arrange
    const testInvalidCreatedAt = "xxxx/xx/xx";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateCreatedAt(testInvalidCreatedAt);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/created at must be a valid date/i);
  });

  //? TEST:
  test("It should return true where the access is 0 characters", () => {
    //Arrange
    const testValidAccess = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateAccess(testValidAccess);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true where the access is not greater than 32 characters", () => {
    //Arrange
    const testValidAccess = "x".repeat(32);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateAccess(testValidAccess);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the modality is greater than 32 characters", () => {
    //Arrange
    const testInvalidAccess = "x".repeat(33);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateAccess(testInvalidAccess);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/access must be no more than 32 characters/i);
  });

  //? TEST:
  test("It should return true where the licence is 0 characters", () => {
    //Arrange
    const testValidLicence = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateLicence(testValidLicence);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true where the licence is not greater than 64 characters", () => {
    //Arrange
    const testValidLicence = "x".repeat(64);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateLicence(testValidLicence);
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error where the licence is greater than 64 characters", () => {
    //Arrange
    const testInvalidLicence = "x".repeat(65);
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateLicence(testInvalidLicence);
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/licence must be no more than 64 characters/i);
  });

  //? TEST:
  test("It should return true perceivedBusinessValue is 0", () => {
    //Arrange
    const testValidPerceivedBusinessValue = "0";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testValidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true perceivedBusinessValue is between 0 and 100", () => {
    //Arrange
    const testValidPerceivedBusinessValue = "50";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testValidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true perceivedBusinessValue is 100", () => {
    //Arrange
    const testValidPerceivedBusinessValue = "100";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testValidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true perceivedBusinessValue is an empty string", () => {
    //Arrange
    const testValidPerceivedBusinessValue = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testValidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error if perceivedBusinessValue is less than 0", () => {
    //Arrange
    const testInvalidPerceivedBusinessValue = "-1";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testInvalidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/Perceived business value must not be less than 0/i);
  });

  //? TEST:
  test("It should return an error if perceivedBusinessValue is greater than 100", () => {
    //Arrange
    const testInvalidPerceivedBusinessValue = "101";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testInvalidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(
      /Perceived business value must be not be greater than 100/i
    );
  });

  //? TEST:
  test("It should return an error if perceivedBusinessValue cannot be parsed to an int", () => {
    //Arrange
    const testInvalidPerceivedBusinessValue = "x";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validatePerceivedBusinessValue(
        testInvalidPerceivedBusinessValue
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/perceived business value must be a number/i);
  });

  //? TEST:
  test("It should return true if businessReadiness is 0", () => {
    //Arrange
    const testValidBusinessReadiness = "0";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testValidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true businessReadiness is between 0 and 100", () => {
    //Arrange
    const testValidBusinessReadiness = "50";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testValidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true businessReadiness is 100", () => {
    //Arrange
    const testValidBusinessReadiness = "100";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testValidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return true businessReadiness is an empty string", () => {
    //Arrange
    const testValidBusinessReadiness = "";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testValidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(true);
    expect(error).toBeUndefined();
  });

  //? TEST:
  test("It should return an error if businessReadiness is less than 0", () => {
    //Arrange
    const testInvalidBusinessReadiness = "-1";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testInvalidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/business readiness must not be less than 0/i);
  });

  //? TEST:
  test("It should return an error if businessReadiness is greater than 100", () => {
    //Arrange
    const testInvalidBusinessReadiness = "101";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testInvalidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(
      /business readiness must be not be greater than 100/i
    );
  });

  //? TEST:
  test("It should return an error if businessReadiness cannot be parsed to an int", () => {
    //Arrange
    const testInvalidBusinessReadiness = "x";
    //Act
    const [isValidated, error] =
      ModalDetailsValidator.validateBusinessReadiness(
        testInvalidBusinessReadiness
      );
    //Assert
    expect(isValidated).toBe(false);
    expect(error).toMatch(/business readiness must be a number/i);
  });

  //? TEST:
  test("Is validated should return true where all fields are validated", () => {
    //Arrange
    const testValidSubmission = testSubmission;
    //Act
    const isValidated = ModalDetailsValidator.isValidated(testValidSubmission);
    //Assert
    expect(isValidated).toBe(true);
  });

  //? TEST:
  test("Is validated should return false where one field is invalid", () => {
    //Arrange
    const testInvalidSubmission = { ...testSubmission, description: "" };
    //Act
    const isValidated = ModalDetailsValidator.isValidated(
      testInvalidSubmission
    );
    //Assert
    expect(isValidated).toBe(false);
  });
});
