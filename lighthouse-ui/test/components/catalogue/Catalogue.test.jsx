import { act, fireEvent, screen, within } from "@testing-library/react";
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
import llmsTestData from "../../data/llms.test.data";

vi.mock("../../../src/services/llm.service");
vi.mock("../../../src/services/authentication.service");

describe("Catalogue tests: ", () => {
  beforeEach(async () => {
    setUpForModal();
    llmService.getLLMs.mockResolvedValue(llmsTestData);
    llmService.getLLMCatalogueFilterOptions.mockResolvedValue(filtersTestData);
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanUpForModal();
  });

  describe("User based config tests: ", () => {
    test("It should show a sign in form where no active user", async () => {
      //Arrange
      authenticationService.getActiveUser.mockReturnValue();
      //Act
      await act(async () => {
        renderAppWithLocationWrapper(["/models/catalogue"]);
      });
      const form = screen.getByRole("form");
      const formHeading = within(form).getByText(/sign-in/i);
      //assert
      expect(formHeading).toBeInTheDocument();
    });

    test("It should not call getLLMs where no active user", async () => {
      //Arrange
      authenticationService.getActiveUser.mockReturnValue();
      //Act
      await act(async () => {
        renderAppWithLocationWrapper(["/models/catalogue"]);
      });
      //assert
      expect(llmService.getLLMs).not.toBeCalled();
    });

    test("It should show an add model button where the active user has an admin role: ", async () => {
      //Arrange
      authenticationService.getActiveUser.mockReturnValue({ roles: ["admin"] });
      //Act
      await act(async () => {
        renderAppWithLocationWrapper(["/models/catalogue"]);
      });
      //assert
      expect(screen.getByTitle(/add llm model/i)).toBeInTheDocument();
    });

    test("It should not show an add model button where the active user does not have an admin role: ", async () => {
      //Arrange
      authenticationService.getActiveUser.mockReturnValue({
        roles: ["user"],
      });
      //Act
      await act(async () => {
        renderAppWithLocationWrapper(["/models/catalogue"]);
      });
      //assert
      expect(screen.queryByTitle(/add llm model/i)).not.toBeInTheDocument();
    });
  });

  describe("Filter modal tests: ", () => {
    beforeEach(async () => {
      authenticationService.getActiveUser.mockReturnValue({});
      await act(async () => {
        renderAppWithLocationWrapper(["/models/catalogue"]);
      });
    });

    test("It should not show the filter modal on render", async () => {
      //Assert
      expect(
        screen.queryByText(/apply filters/i).closest('[aria-hidden="true"]')
      ).toBeInTheDocument();
    });

    test("It should show the filter modal when the filter button is clicked", async () => {
      //Act
      await act(async () => fireEvent.click(screen.getByLabelText(/filter/i)));
      //Assert
      expect(
        screen.queryByText(/apply filters/i).closest('[aria-hidden="true"]')
      ).not.toBeInTheDocument();
    });

    test("It should not show the filter modal when the filter button is clicked and then closed", async () => {
      //Act
      await act(async () => fireEvent.click(screen.getByLabelText(/filter/i)));
      await act(async () => fireEvent.click(screen.getByTitle(/close/i)));
      //Assert
      expect(
        screen.queryByText(/apply filters/i).closest('[aria-hidden="true"]')
      ).toBeInTheDocument();
    });
  });
});
