import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import {
  cleanUpForModal,
  mockPromise,
  renderAppWithLocationWrapper,
  setUpForModal,
} from "../../test.utils";
import * as llmService from "../../../src/services/llm.service";
import * as authenticationService from "../../../src/services/authentication.service";
import LLMTestData from "../../data/llms.test.data";
import filtersTestData from "../../data/filterOptions.test.data";

vi.mock("../../../src/services/llm.service");
vi.mock("../../../src/services/authentication.service");

describe("Catalogue filter integration tests: ", () => {
  const testErrorMessage = "test error message";

  let getAllLLMsPromise;
  let getLLMsResolver;
  let getLLMsRejector;

  let getFiltersPromise;
  let getFiltersResolver;
  let getFiltersRejector;

  beforeEach(async () => {
    setUpForModal();
    [getAllLLMsPromise, getLLMsResolver, getLLMsRejector] = mockPromise();
    [getFiltersPromise, getFiltersResolver, getFiltersRejector] = mockPromise();

    authenticationService.getActiveUser.mockReturnValue({});
    llmService.getLLMs.mockReturnValue(getAllLLMsPromise);
    llmService.getLLMCatalogueFilterOptions.mockReturnValue(getFiltersPromise);
    llmService.getMatrix.mockResolvedValue(LLMTestData);

    await act(async () => {
      renderAppWithLocationWrapper(["/models/catalogue"]);
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanUpForModal();
  });

  test("It should display loading state and disable inputs while getLLMs is pending", async () => {
    //Assert
    expect(screen.getByLabelText(/loading spinner/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/placeholder row/i).length).toBeGreaterThan(
      0
    );
    expect(screen.getByLabelText(/filter/i)).toBeDisabled();
    expect(screen.getByLabelText(/search/i)).toBeDisabled();
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  describe("Error state tests: ", () => {
    test("It should display an error message when getFilters rejects", async () => {
      //Act
      await act(async () => getFiltersRejector(testErrorMessage));
      //Assert
      expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
    });

    test("It should display an error message when getLLMs rejects", async () => {
      //Act
      await act(async () => getFiltersResolver(filtersTestData));
      await act(async () => getLLMsRejector(testErrorMessage));
      //Assert
      expect(screen.getByText(testErrorMessage)).toBeInTheDocument();
    });
  });

  describe("Filter tests: ", () => {
    beforeEach(async () => {
      await act(async () => getFiltersResolver(filtersTestData));
      await act(async () => getLLMsResolver(LLMTestData));
    });

    test("It should send correct query string where search term provided", async () => {
      //Arrange
      const testSearchTerm = "testSearchTerm";
      const searchBar = screen.getByRole("searchbox");
      const expected = `?name=${testSearchTerm}`;
      //Act
      await act(async () =>
        fireEvent.change(searchBar, { target: { value: testSearchTerm } })
      );
      await act(async () => fireEvent.click(screen.getByTitle("Search")));
      //Assert
      expect(llmService.getLLMs).toBeCalledWith(expected);
    });

    test("It should send correct query string where a filter dropdown option is applied", async () => {
      //Arrange
      const testOption = filtersTestData.organization[0];
      const expected = `?organization=${testOption}`;
      await act(async () => fireEvent.click(screen.getByLabelText("filter")));
      const dropdown = screen.getByText(testOption).closest("select");
      //Act
      await act(async () =>
        fireEvent.change(dropdown, { target: { value: testOption } })
      );
      await act(async () => fireEvent.click(screen.getByText(/apply/i)));
      //Assert
      expect(llmService.getLLMs).toBeCalledWith(expected);
    });
  });
});
