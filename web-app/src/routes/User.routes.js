import { Router } from "express";
// import UserController from "../controllers/User.controller.js";
// import UserValidator from "../middleware/User.validator.js";
// import AuthValidator from "../middleware/Auth.validator.js";

export default class UserRoutes {
    #router;
    #routeStartPoint = "/user";

    constructor() {
        this.#router = Router();
        //this.#initializeRoutes();
    }


    // #initializeRoutes = () => {
    //     // User
    //     this.#router.get("/:email", UserController.getUserByEmail);
    //     this.#router.get("/id/:id", UserController.getUserById);
    //     this.#router.post("/register", UserValidator.validateUserRegistration, UserController.createUser);
    //     this.#router.post("/login", UserController.loginUser);
    //     //this.#router.put("/changePassword", AuthValidator.verifyToken, UserController.changePassword); // TODO later

    //     // Roles
    //     this.#router.post("/role", AuthValidator.verifyToken, UserController.addRole);
    //     this.#router.delete("/role", AuthValidator.verifyToken, UserController.removeRole);
    // };

    getRouter = () => {
        return this.#router;
    };

    getRouteStartPoint = () => {
        return this.#routeStartPoint;
    };
}
