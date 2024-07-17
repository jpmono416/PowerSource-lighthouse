import { act, render, screen } from "@testing-library/react";

import ConfirmPasswordInputField from "../../../../../src/components/forms/authForms/inputFields/ConfirmPasswordInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Confirm password input field tests: ", () => {
  const testErrorMessage = "test error message";

  beforeEach(() => {
    UserDetailsValidator.validateConfirmPassword = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("It should not display an error on render", () => {
    //Arrange
    UserDetailsValidator.validateConfirmPassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <ConfirmPasswordInputField
        passwordValue="password"
        confirmPasswordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should display an error on blur where passwords do not match", async () => {
    //Arrange
    UserDetailsValidator.validateConfirmPassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <ConfirmPasswordInputField
        passwordValue="password"
        confirmPasswordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Confirm Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
  });

  test("It should not display an error on blur where passwords do match", async () => {
    //Arrange
    UserDetailsValidator.validateConfirmPassword.mockReturnValue([true]);
    render(
      <ConfirmPasswordInputField
        passwordValue="password"
        confirmPasswordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Confirm Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should not display an error on blur where passwords do not match but do skip validation is set to true", async () => {
    //Arrange
    UserDetailsValidator.validateConfirmPassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <ConfirmPasswordInputField
        passwordValue="password"
        confirmPasswordValue="password"
        onChange={() => null}
        isActive
        doSkipValidation
      />
    );
    //Act
    const inputField = screen.getByTitle("Confirm Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });
});
