import { act, render, screen } from "@testing-library/react";

import PasswordInputField from "../../../../../src/components/forms/authForms/inputFields/PasswordInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach, describe } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Password input field tests: ", () => {
  const testErrorMessage = "test error message";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validatePassword = vi.fn();
      UserDetailsValidator.validatePassword.mockReturnValue([
        false,
        testErrorMessage,
      ]);
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <PasswordInputField
            passwordValue="password"
            onChange={() => null}
            isActive
          />
        );
      });

      //? TEST:
      test("It should not display an error on render", () => {
        //Assert
        expect(screen.queryByRole("alert")).toBe(null);
        expect(screen.queryByText(testErrorMessage)).toBe(null);
      });

      //? TEST:
      test("It should display an error on blur where password is invalid", async () => {
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
    });

    describe("Validation deactivated tests: ", () => {
      beforeEach(() => {
        render(
          <PasswordInputField
            passwordValue="password"
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where password is invalid but do skip validation is set to true", async () => {
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
  });

  describe("Successful validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validatePassword = vi.fn();
      UserDetailsValidator.validatePassword.mockReturnValue([true]);
      render(
        <PasswordInputField
          passwordValue="password"
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where password is invalid", async () => {
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
});
