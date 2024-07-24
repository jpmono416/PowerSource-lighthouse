import express from "express";
import UserRoutes from "../routes/User.routes.js";
import LLMRoutes from "../routes/LLM.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export default class Server {
  #app;
  #host;
  #port;
  #clientUrl;
  #server;
  #userRouter;
  #llmRouter;

  constructor(port, host) {
    this.#app = express();
    this.#port = port;
    this.#host = host;
    // this.#clientUrl = clientUrl; // TODO - use this for CORS when client is ready
    this.#server = null;
    this.#userRouter = new UserRoutes();
    this.#llmRouter = new LLMRoutes();
  }

  getApp = () => {
    return this.#app;
  };

  start = () => {
    // Cors options
    const corsOptions = {
      credentials: true,
      origin: [process.env.CLIENT_URL],
    };

    // Start listening
    this.#server = this.#app.listen(this.#port, this.#host, () => {
      console.log(`Server is listening on http://${this.#host}:${this.#port}`);
      console.log(`Cors options: ${corsOptions.origin}`);
    });

    this.#app.use(cookieParser());
    this.#app.use(express.json());
    this.#app.use(cors(corsOptions));

    // Routers
    this.#app.use(
      this.#userRouter.getRouteStartPoint(),
      this.#userRouter.getRouter()
    );

    this.#app.use(
      this.#llmRouter.getRouteStartPoint(),
      this.#llmRouter.getRouter()
    );
  };

  close = () => {
    this.#server?.close();
  };
}
