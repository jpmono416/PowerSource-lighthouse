import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import FilterDropdown from "../../../../src/components/catalogue/filter/FilterDropdown";
import filterOptionsTestData from "../../../data/filterOptions.test.data";

describe("Filter dropdown tests: ", () => {
  const testOptions = filterOptionsTestData.organizations;
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
    onChangeSpy = null;
  });

  describe("No default value tests: ", () => {
    beforeEach(() => {
      render(<FilterDropdown options={testOptions} onChange={onChangeSpy} />);
    });

    test("It should display a placeholder where there is no default value", () => {
      //Arrange
      const selectInput = screen.getByPlaceholderText(/any/i);
      //Assert
      expect(selectInput).toBeInTheDocument();
      expect(selectInput.value).toBe("");
    });

    test("It should display all options", () => {
      //Assert
      testOptions.forEach((testOption) => {
        expect(screen.getByText(testOption)).toBeInTheDocument();
      });
    });

    test("It should call onChange with the correct argument when an option is selected", async () => {
      //Arrange
      const testOption = testOptions[0];
      const selectEl = screen.getByRole("menu");
      //Act
      await act(async () =>
        fireEvent.change(selectEl, { target: { value: testOption } })
      );
      //Assert
      expect(selectEl.value).toBe(testOption);
      expect(onChangeSpy).toBeCalledWith(testOption);
      expect(screen.getByTitle(/clear filter/i)).toBeInTheDocument();
    });
  });

  describe("Default value tests: ", () => {
    const testDefaultValue = testOptions[0];
    beforeEach(() => {
      render(
        <FilterDropdown
          options={testOptions}
          onChange={onChangeSpy}
          defaultValue={testDefaultValue}
        />
      );
    });

    test("It should display the default value where this is provided", () => {
      //Arrange
      const selectEl = screen.getByRole("menu");
      //Assert
      expect(selectEl.value).toBe(testDefaultValue);
    });

    test("It should call onChange with the correct argument when the trash button is clicked", async () => {
      //Arrange
      const expected = "";
      const trashElement = screen.getByTitle(/clear filter/i);
      const selectEl = screen.getByRole("menu");
      //Act
      await act(async () => fireEvent.click(trashElement));
      //Assert
      expect(selectEl.value).toBe(expected);
      expect(onChangeSpy).toBeCalledWith(expected);
    });
  });

  describe("Misc tests: ", () => {
    test("It should truncate labels where they are over 32 chars", () => {
      //Arrange
      const testLongOption = "x".repeat(33);
      const expected = "x".repeat(32) + "...";
      //Act
      render(<FilterDropdown options={[testLongOption]} />);
      //Assert
      expect(screen.getByText(expected)).toBeInTheDocument();
    });

    test("It should disable the input when isDisabled", () => {
      //Act
      render(<FilterDropdown options={testOptions} isDisabled />);
      //Assert
      expect(screen.getByRole("menu")).toBeDisabled();
    });
  });
});
