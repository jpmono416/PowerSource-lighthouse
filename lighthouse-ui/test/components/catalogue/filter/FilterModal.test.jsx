import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import { cleanUpForModal, setUpForModal } from "../../../test.utils";
import FilterModal from "../../../../src/components/catalogue/filter/FilterModal";
import filterOptionsTestData from "../../../data/filterOptions.test.data";
import FilterValidator from "../../../../src/utils/validators/FilterValidator";

vi.mock("../../../../src/utils/validators/FilterValidator");

describe("Filter modal tests: ", () => {
  const testDefaultValues = {
    createdDateFrom: "2022-01-01",
    createdDateTo: "2023-01-01",
    organization: filterOptionsTestData.organization[1],
    license: filterOptionsTestData.license[1],
    access: filterOptionsTestData.access[1],
    modality: filterOptionsTestData.modality[1],
  };
  let updateQueryValueForMock;
  let handleApplyFiltersMock;
  let isValidMock;

  beforeEach(() => {
    setUpForModal();
    updateQueryValueForMock = vi.fn();
    handleApplyFiltersMock = vi.fn();
    FilterValidator = vi.fn().mockImplementation(() => {
      return {
        isValid: isValidMock,
        setTo: () => null,
        setFrom: () => null,
        validateFrom: () => [true],
      };
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanUpForModal();
  });

  describe("Do show tests ", () => {
    beforeEach(() => {
      isValidMock = vi.fn().mockReturnValue([true]);
      render(
        <FilterModal
          doShow
          filterOptions={filterOptionsTestData}
          defaultValues={testDefaultValues}
          updateQueryValueFor={updateQueryValueForMock}
          handleApplyFilters={handleApplyFiltersMock}
        />
      );
    });

    test("It should display all organisation options with correct default value", () => {
      //Arrange
      const testOptions = filterOptionsTestData.organization;
      const organisationSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Assert
      expect(organisationSelectTag.value).toBe(testDefaultValues.organization);
      testOptions.forEach((testOption) => {
        expect(screen.getByText(testOption));
      });
    });

    test("It should display all licence options with correct default value", () => {
      //Arrange
      const testOptions = filterOptionsTestData.license;
      const licenceSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Assert
      expect(licenceSelectTag.value).toBe(testDefaultValues.license);
      testOptions.forEach((testOption) => {
        expect(screen.getByText(testOption));
      });
    });

    test("It should display all access options with correct default value", () => {
      //Arrange
      const testOptions = filterOptionsTestData.access;
      const accessSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Assert
      expect(accessSelectTag.value).toBe(testDefaultValues.access);
      testOptions.forEach((testOption) => {
        expect(screen.getByText(testOption));
      });
    });

    test("It should display all modality options with correct default value", () => {
      //Arrange
      const testOptions = filterOptionsTestData.modality;
      const modalitySelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Assert
      expect(modalitySelectTag.value).toBe(testDefaultValues.modality);
      testOptions.forEach((testOption) => {
        expect(screen.getByText(testOption));
      });
    });

    test("It should display ReleaseDateFilter with correct default values", () => {
      //Arrange
      const fromInputElement = screen.getByTitle("From");
      const toInputElement = screen.getByTitle("To");
      //Assert
      expect(fromInputElement.value).toBe(testDefaultValues.createdDateFrom);
      expect(toInputElement.value).toBe(testDefaultValues.createdDateTo);
    });

    test("It should call updateQueryValueFor with correct arguments when organisation value changes", async () => {
      //Arrange
      const testOptions = filterOptionsTestData.organization;
      const testOption = testOptions[0];
      const organisationSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Act
      await act(async () =>
        fireEvent.change(organisationSelectTag, {
          target: { value: testOption },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith(
        "organization",
        testOption
      );
    });

    test("It should call updateQueryValueFor with correct arguments when licence value changes", async () => {
      //Arrange
      const testOptions = filterOptionsTestData.license;
      const testOption = testOptions[0];
      const licenceSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Act
      await act(async () =>
        fireEvent.change(licenceSelectTag, {
          target: { value: testOption },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith("license", testOption);
    });

    test("It should call updateQueryValueFor with correct arguments when access value changes", async () => {
      //Arrange
      const testOptions = filterOptionsTestData.access;
      const testOption = testOptions[0];
      const accessSelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Act
      await act(async () =>
        fireEvent.change(accessSelectTag, {
          target: { value: testOption },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith("access", testOption);
    });

    test("It should call updateQueryValueFor with correct arguments when modality value changes", async () => {
      //Arrange
      const testOptions = filterOptionsTestData.modality;
      const testOption = testOptions[0];
      const modalitySelectTag = screen
        .getByText(testOptions[0])
        .closest("select");
      //Act
      await act(async () =>
        fireEvent.change(modalitySelectTag, {
          target: { value: testOption },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith("modality", testOption);
    });

    test("It should call updateQueryValueFor with correct arguments when createdDateFrom value changes", async () => {
      //Arrange
      const expectedValue = "2022-01-02";
      const fromInput = screen.getByTitle(/from/i);
      //Act
      await act(async () =>
        fireEvent.change(fromInput, {
          target: { value: expectedValue },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith(
        "createdDateFrom",
        expectedValue
      );
    });

    test("It should call updateQueryValueFor with correct arguments when createdDateTo value changes", async () => {
      //Arrange
      const expectedValue = "2023-01-02";
      const toInput = screen.getByTitle(/to/i);
      //Act
      await act(async () =>
        fireEvent.change(toInput, {
          target: { value: expectedValue },
        })
      );
      //Assert
      expect(updateQueryValueForMock).toBeCalledWith(
        "createdDateTo",
        expectedValue
      );
    });

    test("It should call handleApplyFilters when apply button is pressed", async () => {
      //Act
      await act(async () =>
        fireEvent.click(screen.getByText(/apply filters/i))
      );
      //Assert
      expect(handleApplyFiltersMock).toHaveBeenCalledOnce();
    });
  });

  describe("Misc tests: ", () => {
    test("It should disable the apply button when filter validator returns false", () => {
      //Arrange
      isValidMock = vi.fn().mockReturnValue([false]);
      //Act
      render(
        <FilterModal
          doShow
          filterOptions={filterOptionsTestData}
          defaultValues={testDefaultValues}
          updateQueryValueFor={updateQueryValueForMock}
          handleApplyFilters={handleApplyFiltersMock}
        />
      );
      //Assert
      expect(screen.getByText(/apply filters/i)).toBeDisabled();
    });
  });
});
