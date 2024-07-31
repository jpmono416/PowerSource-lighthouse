import { expect } from "vitest";
import axios from "axios";

import * as llmService from "../../src/services/llm.service";

vi.mock("axios");

describe("LLM Service service tests: ", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  const testResponse = { data: "test data" };

  describe("Get LLMs tests: ", () => {
    //? TEST
    test("It should call axios get with the correct url and query string", async () => {
      //Arrange
      const testQueryString = "?key=value";
      const expectedURL = `${
        import.meta.env.VITE_APP_API_ROOT
      }/llm${testQueryString}`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.getLLMs(testQueryString);
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //? TEST
    test("It should throw err if axios rejects", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.getLLMs();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.getLLMs();
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Get LLMs by Id tests: ", () => {
    const testId = "testId";

    //? TEST
    test("It should call axios get with the correct url", async () => {
      //Arrange

      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/llm/${testId}`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.getLLMById(testId);
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //? TEST
    test("It should throw err if axios rejects", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.getLLMById(testId);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.getLLMById(testId);
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Get LLM Catalogue Filters tests: ", () => {
    //? TEST
    test("It should call axios get with the correct url", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/llm/filters`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.getLLMCatalogueFilterOptions();
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //? TEST
    test("It should throw err if axios rejects", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.getLLMCatalogueFilterOptions();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.getLLMCatalogueFilterOptions();
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Get LLM Matrix tests: ", () => {
    //? TEST
    test("It should call axios get with the correct url", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/llm/matrix`;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.getMatrix();
      //Assert
      expect(axios.get).toBeCalledWith(expectedURL);
    });

    //? TEST
    test("It should throw err if axios rejects", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.get.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.getMatrix();
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.get.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.getMatrix();
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Create LLM tests: ", () => {
    const testPayload = {
      name: "testLLMName",
    };

    //? TEST
    test("It should call axios post with the correct url and payload", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/llm/`;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.createLLM(testPayload);
      //Assert
      expect(axios.post).toBeCalledWith(expectedURL, testPayload);
    });

    //? TEST
    test("It should throw err if post rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.createLLM(testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.post.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await llmService.createLLM(testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.post.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.createLLM(testPayload);
      //Assert
      expect(actual).toEqual(expected);
    });
  });

  describe("Edit LLM tests: ", () => {
    const testId = "testId";
    const testPayload = {
      name: "testUpdatedLLMName",
    };

    //? TEST
    test("It should call axios put with the correct url and payload", async () => {
      //Arrange
      const expectedURL = `${import.meta.env.VITE_APP_API_ROOT}/llm/${testId}`;
      axios.put.mockResolvedValueOnce(testResponse);
      //Act
      await llmService.editLLM(testId, testPayload);
      //Assert
      expect(axios.put).toBeCalledWith(expectedURL, testPayload);
    });

    //? TEST
    test("It should throw err if put rejects with standard error object", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.put.mockRejectedValueOnce(expected);
      let actual;
      //Act
      try {
        await llmService.editLLM(testId, testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should throw err?.response?.data where validation error received", async () => {
      //Arrange
      const expected = new Error("Server error");
      axios.put.mockRejectedValueOnce({ response: { data: expected } });
      let actual;
      //Act
      try {
        await llmService.editLLM(testId, testPayload);
      } catch (err) {
        actual = err;
      }
      //Assert
      expect(actual).toEqual(expected);
    });

    //? TEST
    test("It should return response data where axios resolves", async () => {
      //Arrange
      const expected = testResponse.data;
      axios.put.mockResolvedValueOnce(testResponse);
      //Act
      const actual = await llmService.editLLM(testId, testPayload);
      //Assert
      expect(actual).toEqual(expected);
    });
  });
});
