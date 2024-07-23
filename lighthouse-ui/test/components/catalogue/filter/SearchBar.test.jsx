import { act, fireEvent, render, screen } from "@testing-library/react";

import { afterEach, beforeEach, describe } from "vitest";
import SearchBar from "../../../../src/components/catalogue/filter/SearchBar";

describe("Catalogue filter SearchBar tests: ", () => {
  const testDefaultValue = "test default value";
  const testSearchTerm = "Test search term";
  let refreshResultsSpy;
  let updateQueryValueForSpy;

  beforeEach(() => {
    refreshResultsSpy = vi.fn();
    updateQueryValueForSpy = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("SearchBar is enabled tests: ", () => {
    beforeEach(() => {
      render(
        <SearchBar
          refreshResults={refreshResultsSpy}
          updateQueryValueFor={updateQueryValueForSpy}
          defaultValue={testDefaultValue}
        />
      );
    });

    test("It should display the default search term on render", () => {
      //Assert
      expect(screen.getByDisplayValue(testDefaultValue)).toBeInTheDocument();
    });

    test("It should call updateQueryValueFor and refreshResults with the correct arguments when the search button is clicked", async () => {
      //Arrange
      const searchBar = screen.getByRole("searchbox");
      const searchButton = screen.getByTitle(/search/i);
      //Act
      await act(async () => {
        fireEvent.change(searchBar, {
          target: { value: `${testSearchTerm}` },
        });
      });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      //Assert
      expect(updateQueryValueForSpy).toBeCalledWith("name", testSearchTerm);
      expect(refreshResultsSpy).toBeCalledWith();
    });
  });

  describe("SearchBar is disabled tests: ", () => {
    beforeEach(() => {
      render(
        <SearchBar
          refreshResults={refreshResultsSpy}
          updateQueryValueFor={updateQueryValueForSpy}
          defaultValue={testDefaultValue}
          isDisabled
        />
      );
    });

    test("It should call updateQueryValueFor and refreshResults with the correct arguments when the search button is clicked", async () => {
      //Arrange
      const searchBar = screen.getByRole("searchbox");
      const searchButton = screen.getByTitle(/search/i);
      //Act
      await act(async () => {
        fireEvent.change(searchBar, {
          target: { value: `${testSearchTerm}` },
        });
      });
      await act(async () => {
        fireEvent.click(searchButton);
      });
      //Assert
      expect(updateQueryValueForSpy).toHaveBeenCalledTimes(0);
      expect(refreshResultsSpy).toHaveBeenCalledTimes(0);
    });
  });
});
