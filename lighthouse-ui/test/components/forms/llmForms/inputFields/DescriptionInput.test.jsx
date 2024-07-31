import { act, render, screen } from "@testing-library/react";

import DescriptionInput from "../../../../../src/components/forms/llmForms/modal/inputFields/DescriptionInput";
import ModalDetailsValidator from "../../../../../src/utils/validators/ModalDetailsValidator";
import { afterEach, beforeEach, describe, test } from "vitest";

vi.mock("../../../../../src/utils/validators/ModalDetailsValidator");

describe("Description input field tests: ", () => {
  const testErrorMessage = "test error message";
  const testLabel = "Description";
  const testValue = "some-description";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateDescription = vi.fn();
      ModalDetailsValidator.validateDescription.mockReturnValue([
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
          <DescriptionInput onChange={() => null} />
        </div>
      );
      //Assert
      expect(screen.getByTestId("test-wrapper")).toBeEmptyDOMElement();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <DescriptionInput
            descriptionValue={testValue}
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
      test("It should display an error on blur description is invalid", async () => {
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
          <DescriptionInput
            descriptionValue={testValue}
            label={testLabel}
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where description is invalid but do skip validation is set to true", async () => {
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
          <DescriptionInput
            descriptionValue={testValue}
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
      ModalDetailsValidator.validateDescription = vi.fn();
      ModalDetailsValidator.validateDescription.mockReturnValue([true]);
      render(
        <DescriptionInput
          descriptionValue={testValue}
          label={testLabel}
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where description is valid", async () => {
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
