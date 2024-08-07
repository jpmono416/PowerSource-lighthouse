import { act, render, screen } from "@testing-library/react";

import OrganisationInput from "../../../../../src/components/forms/llmForms/modal/inputFields/OrganisationInput";
import ModalDetailsValidator from "../../../../../src/utils/validators/ModalDetailsValidator";
import { afterEach, beforeEach, describe, test } from "vitest";

vi.mock("../../../../../src/utils/validators/ModalDetailsValidator");

describe("Organisation input field tests: ", () => {
  const testErrorMessage = "test error message";
  const testLabel = "Organisation";
  const testValue = "organisation";

  describe("Failed validation tests: ", () => {
    beforeEach(() => {
      ModalDetailsValidator.validateOrganisation = vi.fn();
      ModalDetailsValidator.validateOrganisation.mockReturnValue([
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
          <OrganisationInput onChange={() => null} />
        </div>
      );
      //Assert
      expect(screen.getByTestId("test-wrapper")).toBeEmptyDOMElement();
    });

    describe("Validation activated tests: ", () => {
      beforeEach(() => {
        render(
          <OrganisationInput
            organisationValue={testValue}
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
      test("It should display an error on blur organisation is invalid", async () => {
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
          <OrganisationInput
            organisationValue={testValue}
            label={testLabel}
            onChange={() => null}
            isActive
            doSkipValidation
          />
        );
      });

      //? TEST:
      test("It should not display an error on blur where organisation is invalid but do skip validation is set to true", async () => {
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
          <OrganisationInput
            organisationValue={testValue}
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
      ModalDetailsValidator.validateOrganisation = vi.fn();
      ModalDetailsValidator.validateOrganisation.mockReturnValue([true]);
      render(
        <OrganisationInput
          organisationValue={testValue}
          label={testLabel}
          onChange={() => null}
          isActive
        />
      );
    });

    //? TEST:
    test("It should not display an error on blur where organisation is valid", async () => {
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
