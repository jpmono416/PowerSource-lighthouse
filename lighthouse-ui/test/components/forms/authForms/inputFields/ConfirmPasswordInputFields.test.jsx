import { act, render, screen } from "@testing-library/react";

import ConfirmPasswordInputField from "../../../../../src/components/forms/authForms/inputFields/ConfirmPasswordInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach, describe } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Confirm password input field tests: ", () => {
  const testErrorMessage = "test error message";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validateConfirmPassword = vi.fn();
      UserDetailsValidator.validateConfirmPassword.mockReturnValue([
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
          <ConfirmPasswordInputField
            passwordValue="password"
            confirmPasswordValue="password"
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
      test("It should display an error on blur where passwords do not match", async () => {
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
    });

    describe("Validation deactivated tests: ", () => {
      beforeEach(() => {
        render(
          <ConfirmPasswordInputField
            passwordValue="password"
            confirmPasswordValue="password"
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where passwords do not match but do skip validation is set to true", async () => {
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
  });

  describe("Successful validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validateConfirmPassword = vi.fn();
      UserDetailsValidator.validateConfirmPassword.mockReturnValue([true]);
      render(
        <ConfirmPasswordInputField
          passwordValue="password"
          confirmPasswordValue="password"
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where passwords do match", async () => {
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
});
