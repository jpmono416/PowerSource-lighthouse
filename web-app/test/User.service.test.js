import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import bcrypt from "bcrypt";

import UserService from "../src/services/User.service.js";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("UserService", () => {
    let UserModelMock;
    const userDetails = {
        email: "test@example.com",
        password: "password123",
        username: "testuser",
        roles: ["user"],
    };

    beforeEach(() => {
        UserModelMock = {
            create: sinon.stub(),
        };
        // Stub the getUserModel method to return the mocked model
        sinon.stub(UserService, "getUserModel").resolves(UserModelMock);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("createUser", () => {
        it("should create a user successfully", async () => {
            const hashedPassword = await bcrypt.hash(userDetails.password, 1);
            UserModelMock.create.resolves({
                ...userDetails,
                password: hashedPassword,
            });

            const result = await UserService.createUser(userDetails);

            expect(UserModelMock.create.calledOnce).to.be.true;
            expect(result).to.include({
                email: userDetails.email,
                username: userDetails.username,
                roles: userDetails.roles,
            });
        });

        it("should throw an error if user creation fails", async () => {
            const error = new Error("Creation failed");
            UserModelMock.create.rejects(error);

            await expect(UserService.createUser(userDetails)).to.be.rejectedWith(error);
        });
    });

    describe("getUserByEmail", () => {
        it("should return null if user is not found", async () => {
            UserModelMock.findOne = sinon.stub().resolves(null);
            const result = await UserService.getUserByEmail("nonexistent@example.com");
            expect(result).to.be.null;
        });
    });

    describe("loginUser", () => {
        it("should login a user successfully", async () => {
            const hashedPassword = await bcrypt.hash(userDetails.password, 10);
            UserModelMock.findOne = sinon
                .stub()
                .resolves({ ...userDetails, password: hashedPassword });
            sinon.stub(bcrypt, "compare").resolves(true);

            const result = await UserService.loginUser(userDetails.email, userDetails.password);

            expect(result).to.include({ email: userDetails.email, username: userDetails.username });
        });

        it("should return null if password is invalid", async () => {
            const hashedPassword = await bcrypt.hash("password123", 10);
            UserModelMock.findOne = sinon
                .stub()
                .resolves({ ...userDetails, password: hashedPassword });
            sinon.stub(bcrypt, "compare").resolves(false);

            const result = await UserService.loginUser(userDetails.email, userDetails.password);

            expect(result).to.be.null;
        });

        it("should return null if user does not exist", async () => {
            UserModelMock.findOne = sinon.stub().resolves(null);
            const result = await UserService.loginUser("nonexistent@example.com", "password123");

            expect(result).to.be.null;
        });
    });
});
