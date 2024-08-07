import { act, render, screen } from "@testing-library/react";

import AccessInput from "../../../../../src/components/forms/llmForms/modal/inputFields/AccessInput";
import ModalDetailsValidator from "../../../../../src/utils/validators/ModalDetailsValidator";
import { afterEach, beforeEach, describe } from "vitest";

vi.mock("../../../../../src/utils/validators/ModalDetailsValidator");

describe("Access input field tests: ", () => {
  const testErrorMessage = "test error message";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateAccess = vi.fn();
      ModalDetailsValidator.validateAccess.mockReturnValue([
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
          <AccessInput onChange={() => null} />
        </div>
      );
      //Assert
      expect(screen.getByTestId("test-wrapper")).toBeEmptyDOMElement();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <AccessInput accessValue="access" onChange={() => null} isActive />
        );
      });

      //? TEST:
      test("It should not display an error on render", () => {
        //Assert
        expect(screen.queryByRole("alert")).toBe(null);
        expect(screen.queryByText(testErrorMessage)).toBe(null);
      });

      //? TEST:
      test("It should display an error on blur access is invalid", async () => {
        //Act
        const inputField = screen.getByTitle("Access");
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
          <AccessInput
            accessValue="access"
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where access is invalid but do skip validation is set to true", async () => {
        //Act
        const inputField = screen.getByTitle("Access");
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
          <AccessInput
            accessValue="access"
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
      ModalDetailsValidator.validateAccess = vi.fn();
      ModalDetailsValidator.validateAccess.mockReturnValue([true]);
      render(
        <AccessInput accessValue="access" onChange={() => null} isActive />
      );
    });

    //? TEST:
    test("It should not display an error on blur where access is valid", async () => {
      //Act
      const inputField = screen.getByTitle("Access");
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
