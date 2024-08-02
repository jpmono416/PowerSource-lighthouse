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

describe("Add LLM Model Integration tests: ", () => {
  const testSubmission = {
    name: "test name",
    description: "A short description",
    modality: "text",
    organization: "SomeOrg",
    created_date: "2024-01-01",
    access: "open",
    license: "MIT",
    perceived_business_value: "50",
    business_readiness: "25",
  };
  const testId = "testId";
  const testResponse = { ...testSubmission, id: testId };

  let createLLMPromise;
  let createLLMResolver;
  let createLLMRejector;

  beforeEach(async () => {
    [createLLMPromise, createLLMResolver, createLLMRejector] = mockPromise();
    authenticationService.getActiveUser.mockReturnValue({ roles: ["admin"] });
    llmService.getLLMCatalogueFilterOptions.mockResolvedValue(filtersTestData);
    llmService.getLLMs.mockResolvedValue(llmsTestData);
    llmService.createLLM.mockReturnValue(createLLMPromise);
    llmService.getLLMById.mockResolvedValue(llmsTestData[0]);

    renderAppWithLocationWrapper(["/models/catalogue/add"]);

    //Enter details in form
    await act(async () => {
      fireEvent.change(screen.getByTitle(/name/i, { selector: "input" }), {
        target: { value: testSubmission.name },
      });
      fireEvent.change(screen.getByTitle(/organisation/i), {
        target: { value: testSubmission.organization },
      });
      fireEvent.change(screen.getByTitle(/created at/i), {
        target: { value: testSubmission.created_date },
      });
      fireEvent.change(screen.getByTitle(/description/i), {
        target: { value: testSubmission.description },
      });
      fireEvent.change(screen.getByTitle(/modality/i), {
        target: { value: testSubmission.modality },
      });
      fireEvent.change(screen.getByTitle(/access/i), {
        target: { value: testSubmission.access },
      });
      fireEvent.change(screen.getByTitle(/licence/i), {
        target: { value: testSubmission.license },
      });
      fireEvent.change(screen.getByTitle(/perceived business value/i), {
        target: { value: testSubmission.perceived_business_value },
      });
      fireEvent.change(screen.getByTitle(/business readiness/i), {
        target: { value: testSubmission.business_readiness },
      });
    });
  });

  test("It should call the LLM Service with the correct arguments", async () => {
    //Arrange
    const expected = testSubmission;
    const submitButton = screen.getByText(/create/i, { selector: "button" });
    //Act
    await act(async () => fireEvent.click(submitButton));
    await act(async () => createLLMResolver(testResponse));
    //Assert
    expect(llmService.createLLM).toBeCalledWith(expected);
  });

  test("It should navigate to details page of new LLM after creation", async () => {
    //Arrange
    const expectedLocation = `/models/catalogue/${testId}`;
    const submitButton = screen.getByText(/create/i, {
      selector: "button",
    });
    //Act
    await act(async () => fireEvent.click(submitButton));
    await act(async () => createLLMResolver(testResponse));
    //Assert
    expect(screen.getByTestId("current-location").dataset.location).toBe(
      expectedLocation
    );
  });

  test("It should display errors where create rejects", async () => {
    //Arrange
    const testError = "test error";
    const submitButton = screen.getByText(/create/i, {
      selector: "button",
    });
    //Act
    await act(async () => fireEvent.click(submitButton));
    await act(async () => createLLMRejector(testError));
    //Assert
    expect(screen.getByText(testError)).toBeInTheDocument();
  });
});
