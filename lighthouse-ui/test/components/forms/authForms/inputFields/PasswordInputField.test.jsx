import { act, render, screen } from "@testing-library/react";

import PasswordInputField from "../../../../../src/components/forms/authForms/inputFields/PasswordInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Password input field tests: ", () => {
  const testErrorMessage = "test error message";
  beforeEach(() => {
    UserDetailsValidator.validatePassword = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("It should not display an error on render", () => {
    //Arrange
    UserDetailsValidator.validatePassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <PasswordInputField
        passwordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should display an error on blur where password is invalid", async () => {
    //Arrange
    UserDetailsValidator.validatePassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <PasswordInputField
        passwordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
  });

  test("It should not display an error on blur where password is valid", async () => {
    //Arrange
    UserDetailsValidator.validatePassword.mockReturnValue([true]);
    render(
      <PasswordInputField
        passwordValue="password"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should not display an error on blur where password is invalid but do skip validation is true", async () => {
    //Arrange
    UserDetailsValidator.validatePassword.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <PasswordInputField
        passwordValue="password"
        onChange={() => null}
        isActive
        doSkipValidation
      />
    );
    //Act
    const inputField = screen.getByTitle("Password");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });
});
