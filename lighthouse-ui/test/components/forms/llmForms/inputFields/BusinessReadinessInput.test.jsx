import { act, render, screen } from "@testing-library/react";

import BusinessReadinessInput from "../../../../../src/components/forms/llmForms/modal/inputFields/BusinessReadinessInput";
import ModalDetailsValidator from "../../../../../src/utils/validators/ModalDetailsValidator";
import { afterEach, beforeEach, describe, test } from "vitest";

vi.mock("../../../../../src/utils/validators/ModalDetailsValidator");

describe("Business Readiness input field tests: ", () => {
  const testErrorMessage = "test error message";
  const testLabel = "Business Readiness";
  const testValue = "businessReadiness";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateBusinessReadiness = vi.fn();
      ModalDetailsValidator.validateBusinessReadiness.mockReturnValue([
        false,
        testErrorMessage,
      ]);
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    //? TEST:
    test("It should return undefined where not isActive", async () => {
      //Act
      render(
        <div data-testid="test-wrapper">
          <BusinessReadinessInput onChange={() => null} />
        </div>
      );
      //Assert
      expect(screen.getByTestId("test-wrapper")).toBeEmptyDOMElement();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <BusinessReadinessInput
            businessReadinessValue={testValue}
            label={testLabel}
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
      test("It should display an error on blur business readiness is invalid", async () => {
        //Act
        const inputField = screen.getByTitle(testLabel);
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
          <BusinessReadinessInput
            businessReadinessValue={testValue}
            label={testLabel}
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where business readiness is invalid but do skip validation is set to true", async () => {
        //Act
        const inputField = screen.getByTitle(testLabel);
        await act(async () => {
          inputField.focus();
          inputField.blur();
        });
        //Assert
        expect(screen.queryByRole("alert")).toBe(null);
        expect(screen.queryByText(testErrorMessage)).toBe(null);
      });
    });

    describe("Force show validation errors tests: ", () => {
      beforeEach(() => {
        render(
          <BusinessReadinessInput
            businessReadinessValue={testValue}
            label={testLabel}
            onChange={() => null}
            isActive
            forceShowValidationErrors
          />
        );
      });

      //? TEST:
      test("It should display an error on render", () => {
        //Assert
        expect(screen.queryByRole("alert")).toBeInTheDocument();
        expect(screen.queryByText(testErrorMessage)).toBeInTheDocument();
      });
    });
  });

  describe("Successful validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateBusinessReadiness = vi.fn();
      ModalDetailsValidator.validateBusinessReadiness.mockReturnValue([true]);
      render(
        <BusinessReadinessInput
          businessReadinessValue={testValue}
          label={testLabel}
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where business readiness is valid", async () => {
      //Act
      const inputField = screen.getByTitle(testLabel);
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
