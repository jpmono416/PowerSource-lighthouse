import { act, render, screen } from "@testing-library/react";

import UserNameInputField from "../../../../../src/components/forms/authForms/inputFields/UserNameInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Username input field tests: ", () => {
  const testErrorMessage = "test error message";
  beforeEach(() => {
    UserDetailsValidator.validateUsername = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("It should not display an error on render", () => {
    //Arrange
    UserDetailsValidator.validateUsername.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <UserNameInputField
        userNameValue="username"
        onChange={() => null}
        isActive
      />
    );
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should display an error on blur where username is invalid", async () => {
    //Arrange
    UserDetailsValidator.validateUsername.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <UserNameInputField
        userNameValue="username"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
  });

  test("It should not display an error on blur where username is valid", async () => {
    //Arrange
    UserDetailsValidator.validateUsername.mockReturnValue([true]);
    render(
      <UserNameInputField
        userNameValue="username"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should not display an error on blur where username is invalid but do skip validation is true", async () => {
    //Arrange
    UserDetailsValidator.validateUsername.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <UserNameInputField
        userNameValue="username"
        onChange={() => null}
        isActive
        doSkipValidation
      />
    );
    //Act
    const inputField = screen.getByTitle("Username");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });
});
