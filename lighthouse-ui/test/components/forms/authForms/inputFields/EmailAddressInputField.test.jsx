import { act, render, screen } from "@testing-library/react";

import EmailAddressInputField from "../../../../../src/components/forms/authForms/inputFields/EmailAddressInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Email Address input field tests: ", () => {
  const testErrorMessage = "test error message";

  beforeEach(() => {
    UserDetailsValidator.validateEmailAddress = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("It should not display an error on render", () => {
    //Arrange
    UserDetailsValidator.validateEmailAddress.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <EmailAddressInputField
        emailAddressValue="email"
        onChange={() => null}
        isActive
      />
    );
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should display an error on blur where email address is invalid", async () => {
    //Arrange
    UserDetailsValidator.validateEmailAddress.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <EmailAddressInputField
        emailAddressValue="email"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Email address");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
  });

  test("It should not display an error on blur where email address is valid", async () => {
    //Arrange
    UserDetailsValidator.validateEmailAddress.mockReturnValue([true]);
    render(
      <EmailAddressInputField
        emailAddressValue="email"
        onChange={() => null}
        isActive
      />
    );
    //Act
    const inputField = screen.getByTitle("Email address");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });

  test("It should not display an error on blur where email address is invalid but do skip validation is true", async () => {
    //Arrange
    UserDetailsValidator.validateEmailAddress.mockReturnValue([
      false,
      testErrorMessage,
    ]);
    render(
      <EmailAddressInputField
        emailAddressValue="email"
        onChange={() => null}
        isActive
        doSkipValidation
      />
    );
    //Act
    const inputField = screen.getByTitle("Email address");
    await act(async () => {
      inputField.focus();
      inputField.blur();
    });
    //Assert
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.queryByText(testErrorMessage)).toBe(null);
  });
});
