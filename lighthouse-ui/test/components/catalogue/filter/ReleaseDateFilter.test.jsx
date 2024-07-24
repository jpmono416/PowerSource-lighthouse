import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import ReleaseDateFilter from "../../../../src/components/catalogue/filter/ReleaseDateFilter";

describe("Release date filter tests: ", () => {
  const testDefaultValues = {
    createdDateFrom: "2022-01-01",
    createdDateTo: "2023-01-01",
  };
  const testUpdatedValues = {
    createdDateFrom: "2022-01-02",
    createdDateTo: "2023-01-02",
  };
  const testValidationError = "Validation error";
  let validatorMock;
  let updateQueryValueForSpy;

  beforeEach(() => {
    updateQueryValueForSpy = vi.fn();
    validatorMock = {
      validateFrom: vi.fn(),
      setFrom: vi.fn(),
      setTo: vi.fn(),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
    validatorMock = null;
  });

  describe("Default values tests: ", () => {
    describe("Valid default values tests: ", () => {
      beforeEach(() => {
        validatorMock.validateFrom.mockReturnValue([true]);
        render(
          <ReleaseDateFilter
            validator={validatorMock}
            defaultValues={testDefaultValues}
            updateQueryValueFor={updateQueryValueForSpy}
          />
        );
      });

      test("It should show the default values on render", () => {
        //Assert
        expect(
          screen.getByDisplayValue(testDefaultValues.createdDateFrom)
        ).toBeInTheDocument();
        expect(
          screen.getByDisplayValue(testDefaultValues.createdDateTo)
        ).toBeInTheDocument();
      });

      test("It should call updateQueryValueFor and update the validator when from input is updated", async () => {
        //Arrange
        const expectedValue = testUpdatedValues.createdDateFrom;
        const fromInput = screen.getByTitle(/from/i);
        //Act
        await act(async () => {
          fireEvent.change(fromInput, {
            target: { value: expectedValue },
          });
        });
        //Assert
        expect(updateQueryValueForSpy).toBeCalledWith(
          "createdDateFrom",
          expectedValue
        );
        expect(validatorMock.setFrom).toBeCalledWith(expectedValue);
      });

      test("It should call updateQueryValueFor and update the validator when to input is updated", async () => {
        //Arrange
        const expectedValue = testUpdatedValues.createdDateTo;
        const toInput = screen.getByTitle(/to/i);
        //Act
        await act(async () => {
          fireEvent.change(toInput, {
            target: { value: expectedValue },
          });
        });
        //Assert
        expect(updateQueryValueForSpy).toBeCalledWith(
          "createdDateTo",
          expectedValue
        );
        expect(validatorMock.setTo).toBeCalledWith(expectedValue);
      });

      test("It should display an error on change where validateFrom returns an error", async () => {
        //Arrange
        validatorMock.validateFrom.mockReturnValue([
          false,
          testValidationError,
        ]);
        const fromInput = screen.getByTitle(/from/i);
        //Act
        await act(async () => {
          fireEvent.change(fromInput, {
            target: { value: testUpdatedValues.createdDateFrom },
          });
        });
        //Assert
        expect(screen.getByText(testValidationError)).toBeInTheDocument();
      });
    });

    describe("Invalid default values tests: ", () => {
      beforeEach(() => {
        validatorMock.validateFrom.mockReturnValue([
          false,
          testValidationError,
        ]);
        render(
          <ReleaseDateFilter
            validator={validatorMock}
            defaultValues={testDefaultValues}
            updateQueryValueFor={updateQueryValueForSpy}
          />
        );
      });

      test("It should show an error message on render where the default values are invalid", () => {
        //Assert
        expect(screen.getByText(testValidationError)).toBeInTheDocument();
      });

      test("It should clear the error message after an update fixes the error", async () => {
        //Arrange
        validatorMock.validateFrom.mockReturnValue([true]);
        const toInput = screen.getByTitle(/to/i);
        //Act
        await act(async () => {
          fireEvent.change(toInput, {
            target: { value: testUpdatedValues.createdDateTo },
          });
        });
        //Assert;
        expect;
        expect(screen.queryByText(testValidationError)).not.toBeInTheDocument();
      });
    });
  });
  describe("No default Values tests: ", () => {
    test("Should set inputs to empty strings where no default values provided", () => {
      //Arrange
      validatorMock.validateFrom.mockReturnValue([true]);
      //Act
      render(<ReleaseDateFilter validator={validatorMock} />);
      //Assert
      expect(screen.getByTitle(/from/i).value).toBe("");
      expect(screen.getByTitle(/to/i).value).toBe("");
    });
  });
});
