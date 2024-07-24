import { defineUserModel } from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const user = await UserModel.create({
        email,
        password: hashedPassword,
        username,
        roles,
      });
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
      if (!user) return {};

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return {};
      const token = this.#getToken(user.id);
      return { user, token };
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  static validateToken = async (token) => {
    try {
      const decodedToken = this.#decodeToken(token);
      const UserModel = await this.getUserModel();
      const userDocument = await UserModel.findOne({
        where: { id: decodedToken.userId },
      });
      if (!userDocument) throw new Error();
      return userDocument;
    } catch (err) {
      throw new Error();
    }
  };

  static #decodeToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      throw new Error();
    }
  };

  static #getToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  };
}
