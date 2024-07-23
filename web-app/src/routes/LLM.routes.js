import { Router } from "express";
import LLMController from "../controllers/LLM.controller.js";

export default class LLMRoutes {
    #router;
    #routeStartPoint = "/llm";

    constructor() {
        this.#router = Router();
        this.#initializeRoutes();
    }

    #initializeRoutes = () => {
        this.#router.get("/count", LLMController.getLLMCount);
        this.#router.get("/", LLMController.getAllLLMs);
        this.#router.get("/matrix", LLMController.getMatrixLLMs);
        this.#router.get("/filters", LLMController.getDistinctFilterValues);
        this.#router.get("/:id", LLMController.getLLMById);
        this.#router.post("/", LLMController.createLLM);
    };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
