import { act, render, screen } from "@testing-library/react";

import EmailAddressInputField from "../../../../../src/components/forms/authForms/inputFields/EmailAddressInputField";
import UserDetailsValidator from "../../../../../src/utils/validators/UserDetailsValidator";
import { afterEach, beforeEach, describe } from "vitest";

vi.mock("../../../../../src/utils/validators/UserDetailsValidator");

describe("Email address input field tests: ", () => {
  const testErrorMessage = "test error message";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validateEmailAddress = vi.fn();
      UserDetailsValidator.validateEmailAddress.mockReturnValue([
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
          <EmailAddressInputField
            emailAddressValue="email address"
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
      test("It should display an error on blur where email address is invalid", async () => {
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
    });

    describe("Validation deactivated tests: ", () => {
      beforeEach(() => {
        render(
          <EmailAddressInputField
            emailAddressValue="email address"
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where email address is invalid but do skip validation is set to true", async () => {
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
  });

  describe("Successful validation tests: ", () => {
    beforeEach(() => {
      UserDetailsValidator.validateEmailAddress = vi.fn();
      UserDetailsValidator.validateEmailAddress.mockReturnValue([true]);
      render(
        <EmailAddressInputField
          emailAddressValue="email address"
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where email address is invalid", async () => {
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
});
