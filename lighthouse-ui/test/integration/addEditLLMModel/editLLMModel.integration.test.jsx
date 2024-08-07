import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect } from "vitest";

import { mockPromise, renderAppWithLocationWrapper } from "../../test.utils";
import LLMTestData from "../../data/llms.test.data";
import filtersTestData from "../../data/filterOptions.test.data";
import * as authenticationService from "../../../src/services/authentication.service";
import * as llmService from "../../../src/services/llm.service";
import llmsTestData from "../../data/llms.test.data";

vi.mock("../../../src/services/authentication.service");
vi.mock("../../../src/services/llm.service");

describe("Edit LLM Model Integration tests: ", () => {
  const testModel = llmsTestData[0];

  let editLLMPromise;
  let editLLMResolver;
  let editLLMRejector;
  let getLLMPromise;
  let getLLMResolver;
  let getLLMRejector;

  beforeEach(() => {
    [editLLMPromise, editLLMResolver, editLLMRejector] = mockPromise();
    [getLLMPromise, getLLMResolver, getLLMRejector] = mockPromise();
    authenticationService.getActiveUser.mockReturnValue({
      roles: ["admin"],
    });
    llmService.getLLMCatalogueFilterOptions.mockResolvedValue(filtersTestData);
    llmService.getLLMs.mockResolvedValue(llmsTestData);
    llmService.editLLM.mockReturnValue(editLLMPromise);
    llmService.getLLMById.mockReturnValue(getLLMPromise);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Submission tests: ", () => {
    beforeEach(async () => {
      await act(async () => getLLMResolver(testModel));
      await act(async () => {
        renderAppWithLocationWrapper([
          `/models/catalogue/${testModel.id}/edit`,
        ]);
      });
    });

    test("It should call the LLM Service with the correct arguments", async () => {
      //Arrange
      const newName = "new Name";
      const expected = {
        name: newName,
        organization: testModel.organization,
        created_date: testModel.created_date,
        description: testModel.description,
        access: testModel.access,
        modality: testModel.modality,
      };
      const submitButton = screen.getByText(/save/i, { selector: "button" });
      //Act
      await act(async () =>
        fireEvent.change(screen.getByTitle(/name/i, { selector: "input" }), {
          target: { value: newName },
        })
      );
      await act(async () => fireEvent.click(submitButton));
      await act(async () => editLLMResolver(testModel));
      //Assert
      expect(llmService.editLLM).toBeCalledWith(testModel.id, expected);
    });

    test("It should navigate to details page of new LLM after creation", async () => {
      //Arrange
      const submitButton = screen.getByText(/save/i, { selector: "button" });
      const expectedLocation = `/models/catalogue/${testModel.id}`;
      //Act
      await act(async () =>
        fireEvent.change(screen.getByTitle(/name/i, { selector: "input" }), {
          target: { value: "new Name" },
        })
      );
      await act(async () => fireEvent.click(submitButton));
      await act(async () => editLLMResolver(testModel));
      //Assert
      expect(screen.getByTestId("current-location").dataset.location).toBe(
        expectedLocation
      );
    });

    test("It should throw errors where edit llm rejects", async () => {
      //Arrange
      const testError = "Test Error";
      const submitButton = screen.getByText(/save/i, { selector: "button" });
      //Act

      await act(async () =>
        fireEvent.change(screen.getByTitle(/name/i, { selector: "input" }), {
          target: { value: "new Name" },
        })
      );
      await act(async () => fireEvent.click(submitButton));
      await act(async () => editLLMRejector(testError));
      //Assert
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });

  describe("LLM not found tests: ", () => {
    const testError = "Test Error";
    beforeEach(async () => {
      try {
        await act(async () => {
          renderAppWithLocationWrapper([
            `/models/catalogue/${testModel.id}/edit`,
          ]);
        });
        await act(async () => getLLMRejector(testError));
      } catch (err) {
        console.log(err);
      }
    });

    test("Should display error where get LLM rejects", () => {
      //Assert
      expect(screen.getByText(testError)).toBeInTheDocument();
    });
  });
});
