import { Router } from "express";
import LLMController from "../controllers/LLM.controller.js";
import UserController from "../controllers/User.controller.js";

export default class LLMRoutes {
  #router;
  #routeStartPoint = "/llm";

  constructor() {
    this.#router = Router();
    this.#initializeRoutes();
  }

  #initializeRoutes = () => {
    this.#router.get("/count", LLMController.getLLMCount);
    this.#router.get(
      "/",
      UserController.requireLoggedIn,
      LLMController.getAllLLMs,
    );
    this.#router.put(
      "/:id",
      UserController.requireLoggedIn,
      UserController.requireAdminRole,
      LLMController.updateLLM,
    );
    this.#router.get("/matrix", LLMController.getMatrixLLMs);
    this.#router.get("/filters", LLMController.getDistinctFilterValues);
    this.#router.get(
      "/:id",
      UserController.requireLoggedIn,
      LLMController.getLLMById,
    );
    this.#router.post(
      "/",
      UserController.requireLoggedIn,
      UserController.requireAdminRole,
      LLMController.createLLM,
    );
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}
