import bcrypt from "bcrypt";
import { defineUserModel } from "../models/User.model.js";

export default class UserService {
    static async getUserModel() {
        if (!this.UserModel) {
            this.UserModel = defineUserModel();
        }
        return this.UserModel;
    }

    static async createUser(userDetails) {
        const { email, password, username, roles } = userDetails;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const UserModel = await this.getUserModel();
            console.log("About to create object");
            const user = await UserModel.create({
                email,
                password: hashedPassword,
                username,
                roles,
            });
            console.log("Object created", user);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const UserModel = await this.getUserModel();
            const user = await UserModel.findOne({ where: { email } });
            return user;
        } catch (error) {
            console.error("Error retrieving user by email:", error);
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) return null;

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return null;

            return user;
        } catch (error) {
            console.error("Error logging in user:", error);
            throw error;
        }
    }
}
