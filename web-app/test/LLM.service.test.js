import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import LLMService from "../src/services/LLM.service.js";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("LLMService", () => {
  let LLMModelMock;
  const llmDetails = {
    name: "GPT-4",
    description: "A state-of-the-art language model.",
    createdBy: "user123",
  };

  beforeEach(() => {
    LLMModelMock = {
      create: sinon.stub(),
      count: sinon.stub(),
      findAll: sinon.stub(),
      findOne: sinon.stub(),
    };
    // Stub the getLLMModel method to return the mocked model
    sinon.stub(LLMService, "getLLMModel").resolves(LLMModelMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("createLLM", () => {
    it("should create an LLM successfully", async () => {
      LLMModelMock.create.resolves(llmDetails);

      const result = await LLMService.createLLM(llmDetails);

      expect(LLMModelMock.create.calledOnce).to.be.true;
      expect(result).to.include(llmDetails);
    });

    it("should throw an error if LLM creation fails", async () => {
      const error = new Error("Creation failed");
      LLMModelMock.create.rejects(error);

      await expect(LLMService.createLLM(llmDetails)).to.be.rejectedWith(error);
    });
  });

  describe("getLLMCount", () => {
    it("should return the count of LLMs", async () => {
      LLMModelMock.count.resolves(10);

      const result = await LLMService.getLLMCount();

      expect(LLMModelMock.count.calledOnce).to.be.true;
      expect(result).to.equal(10);
    });

    it("should throw an error if unable to retrieve count", async () => {
      const error = new Error("Count retrieval failed");
      LLMModelMock.count.rejects(error);

      await expect(LLMService.getLLMCount()).to.be.rejectedWith(error);
    });
  });

  describe("getAllLLMs", () => {
    it("should return all LLMs without filters", async () => {
      const llms = [llmDetails, { ...llmDetails, name: "GPT-3" }];
      LLMModelMock.findAll.resolves(llms);

      const result = await LLMService.getAllLLMs();

      expect(LLMModelMock.findAll.calledOnce).to.be.true;
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.include(llmDetails);
    });

    it("should apply filters correctly", async () => {
      const llms = [{ ...llmDetails, name: "GPT-3" }];
      LLMModelMock.findAll.resolves(llms);

      const result = await LLMService.getAllLLMs({ name: "GPT-3" });

      expect(LLMModelMock.findAll.calledOnce).to.be.true;
      expect(result).to.have.lengthOf(1);
      expect(result[0].name).to.equal("GPT-3");
    });

    it("should throw an error if unable to retrieve LLMs", async () => {
      const error = new Error("Retrieval failed");
      LLMModelMock.findAll.rejects(error);

      await expect(LLMService.getAllLLMs()).to.be.rejectedWith(error);
    });
  });

  describe("getLLMById", () => {
    it("should return an LLM by id", async () => {
      LLMModelMock.findOne.resolves(llmDetails);

      const result = await LLMService.getLLMById("1");

      expect(LLMModelMock.findOne.calledOnce).to.be.true;
      expect(result).to.include(llmDetails);
    });

    it("should return null if LLM is not found", async () => {
      LLMModelMock.findOne.resolves(null);

      const result = await LLMService.getLLMById("nonexistent");

      expect(result).to.be.null;
    });

    it("should throw an error if unable to retrieve LLM by id", async () => {
      const error = new Error("Retrieval failed");
      LLMModelMock.findOne.rejects(error);

      await expect(LLMService.getLLMById("1")).to.be.rejectedWith(error);
    });
  });
});
