import { act, render, screen } from "@testing-library/react";

import CreatedAtInput from "../../../../../src/components/forms/llmForms/modal/inputFields/CreatedAtInput";
import ModalDetailsValidator from "../../../../../src/utils/validators/ModalDetailsValidator";
import { afterEach, beforeEach, describe, test } from "vitest";

vi.mock("../../../../../src/utils/validators/ModalDetailsValidator");

describe("Created at input field tests: ", () => {
  const testErrorMessage = "test error message";
  const testLabel = "Created At";
  const testValue = "createdAt";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateCreatedAt = vi.fn();
      ModalDetailsValidator.validateCreatedAt.mockReturnValue([
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
          <CreatedAtInput onChange={() => null} />
        </div>
      );
      //Assert
      expect(screen.getByTestId("test-wrapper")).toBeEmptyDOMElement();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <CreatedAtInput
            createdAtValue={testValue}
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
      test("It should display an error on blur created at is invalid", async () => {
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
          <CreatedAtInput
            createdAtValue={testValue}
            label={testLabel}
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where created at is invalid but do skip validation is set to true", async () => {
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
          <CreatedAtInput
            createdAtValue={testValue}
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
      ModalDetailsValidator.validateCreatedAt = vi.fn();
      ModalDetailsValidator.validateCreatedAt.mockReturnValue([true]);
      render(
        <CreatedAtInput
          createdAtValue={testValue}
          label={testLabel}
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where created at is valid", async () => {
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
