import { expect } from "chai";
import sinon from "sinon";

import LLMController from "../src/controllers/LLM.controller.js";
import LLMService from "../src/services/LLM.service.js";

describe("LLM Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  });

  describe("getLLMCount", () => {
    it("should return 200 and the count of LLMs", async () => {
      const count = 5;
      sinon.stub(LLMService, "getLLMCount").resolves(count);

      await LLMController.getLLMCount(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ count })).to.be.true;
      sinon.restore();
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(LLMService, "getLLMCount")
        .rejects(new Error("Service failure"));

      await LLMController.getLLMCount(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  describe("createLLM", () => {
    it("should return 201 after creating an LLM", async () => {
      const newLLM = { name: "testLLM" };
      req.body = newLLM;
      sinon.stub(LLMService, "createLLM").resolves(newLLM);

      await LLMController.createLLM(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      sinon.restore();
    });

    it("should return 400 if req.body is missing", async () => {
      req.body = null;

      await LLMController.createLLM(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });

    it("should return 500 on service failure", async () => {
      sinon.stub(LLMService, "createLLM").rejects(new Error("Service failure"));

      await LLMController.createLLM(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  describe("getAllLLMs", () => {
    it("should return 200 and all LLMs", async () => {
      const llms = [{ name: "LLM1" }, { name: "LLM2" }];
      sinon.stub(LLMService, "getAllLLMs").resolves(llms);

      await LLMController.getAllLLMs(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(llms)).to.be.true;
      sinon.restore();
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(LLMService, "getAllLLMs")
        .rejects(new Error("Service failure"));

      await LLMController.getAllLLMs(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  describe("getLLMById", () => {
    beforeEach(() => {
      req.params.id = "1";
    });

    it("should return 200 and the LLM data if found", async () => {
      const llm = { id: "1", name: "testLLM" };
      sinon.stub(LLMService, "getLLMById").resolves(llm);

      await LLMController.getLLMById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(llm)).to.be.true;
      sinon.restore();
    });

    it("should return 400 if id is not provided", async () => {
      req.params = {};

      await LLMController.getLLMById(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });

    it("should return 404 if LLM is not found", async () => {
      sinon.stub(LLMService, "getLLMById").resolves(null);

      await LLMController.getLLMById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      sinon.restore();
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(LLMService, "getLLMById")
        .rejects(new Error("Service failure"));

      await LLMController.getLLMById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });
});
