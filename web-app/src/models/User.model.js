import { DataTypes } from "sequelize";
import Database from "../db/Database.js";

export const defineUserModel = () => {
  const sequelize = Database.getSequelize();
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
    },
    {
      tableName: "powersource_users",
      timestamps: false,
    },
  );
  return User;
};
