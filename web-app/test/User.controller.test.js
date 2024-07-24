import { expect } from "chai";
import sinon from "sinon";

import UserController from "../src/controllers/User.controller.js";
import UserService from "../src/services/User.service.js";

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(),
    };
  });

  describe("createUser", () => {
    it("should return 201 after creating a user", async () => {
      const newUser = { user: "testUser", token: "testToken" };
      sinon.stub(UserService, "createUser").resolves(newUser);

      await UserController.createUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      sinon.restore();
    });

    it("should return 400 if req.body is missing", async () => {
      req.body = null;

      await UserController.createUser(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(UserService, "createUser")
        .rejects(new Error("Service failure"));

      await UserController.createUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  describe("getUserByEmail", () => {
    beforeEach(() => {
      req.params.email = "test@example.com";
    });

    it("should return 200 and user data if found", async () => {
      const user = { email: "test@example.com" };
      sinon.stub(UserService, "getUserByEmail").resolves(user);

      await UserController.getUserByEmail(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      sinon.restore();
    });

    it("should return 400 if email is not provided", async () => {
      req.params = {};

      await UserController.getUserByEmail(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });

    it("should return 404 if user is not found", async () => {
      sinon.stub(UserService, "getUserByEmail").resolves(null);

      await UserController.getUserByEmail(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      sinon.restore();
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(UserService, "getUserByEmail")
        .rejects(new Error("Service failure"));

      await UserController.getUserByEmail(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  describe("loginUser", () => {
    beforeEach(() => {
      req.body.email = "test@example.com";
      req.body.password = "password";
    });

    it("should return 200 and user data on successful login", async () => {
      const user = { email: "test@example.com", token: "testToken" };
      sinon.stub(UserService, "loginUser").resolves(user);

      await UserController.loginUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      sinon.restore();
    });

    it("should return 400 if email or password is missing", async () => {
      req.body = {};

      await UserController.loginUser(req, res);

      expect(res.status.calledWith(400)).to.be.true;
    });

    it("should return 404 if user is not found", async () => {
      sinon.stub(UserService, "loginUser").resolves(null);

      await UserController.loginUser(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      sinon.restore();
    });

    it("should return 500 on service failure", async () => {
      sinon
        .stub(UserService, "loginUser")
        .rejects(new Error("Service failure"));

      await UserController.loginUser(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      sinon.restore();
    });
  });

  /* Not implemented yet
	describe("getUserById", () => {
		beforeEach(() => {
			req.params.id = "1";
		});

		it("should return 200 and user data if found", async () => {
			const user = { id: "1" };
			sinon.stub(UserService, "getUserById").resolves(user);

			await UserController.getUserById(req, res);

			expect(res.status.calledWith(200)).to.be.true;
			sinon.restore();
		});

		it("should return 400 if id is not provided", async () => {
			req.params = {};

			await UserController.getUserById(req, res);

			expect(res.status.calledWith(400)).to.be.true;
		});

		it("should return 404 if user is not found", async () => {
			sinon.stub(UserService, "getUserById").resolves(null);

			await UserController.getUserById(req, res);

			expect(res.status.calledWith(404)).to.be.true;
			sinon.restore();
		});

		it("should return 500 on service failure", async () => {
			sinon.stub(UserService, "getUserById").rejects(new Error("Service failure"));

			await UserController.getUserById(req, res);

			expect(res.status.calledWith(500)).to.be.true;
			sinon.restore();
		});
    });
    */

  // Additional tests for changePassword, getRoles, addRole, removeRole can be added following the same pattern.
  // Not doing this for the sake of completing features before the hackathon finishes.
});
