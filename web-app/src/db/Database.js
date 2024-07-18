import { Sequelize } from "sequelize";
import Config from "../config/Config.js";

class Database {
    static instance;
    dbName;
    dbUser;
    dbPassword;
    dbHost;
    dbPort;
    sequelize;

    constructor() {
        if (Database.instance) {
            console.log("Returning instance");
            return Database.instance;
        }

        Config.load();
        const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;
        console.log("Vars: ", DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT);

        this.dbName = DB_NAME;
        this.dbUser = DB_USER;
        this.dbPassword = DB_PASS;
        this.dbHost = DB_HOST;
        this.dbPort = DB_PORT;
        this.sequelize = new Sequelize(this.dbName, this.dbUser, this.dbPassword, {
            host: this.dbHost,
            dialect: "postgres",
            port: this.dbPort,
            logging: false,
        });

        Database.instance = this;
        // console.log("DB Instance created: ", Database.instance);
    }

    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log("Database connected successfully.");
        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw new Error("Error connecting to the database: " + error.message);
        }
    }

    async disconnect() {
        try {
            await this.sequelize.close();
            console.log("Database disconnected successfully.");
        } catch (error) {
            console.error("Error disconnecting from the database:", error);
            throw new Error("Error disconnecting from the database: " + error.message);
        }
    }

    static getInstance() {
        if (!Database.instance) {
            new Database();
        }
        return Database.instance;
    }

    static getSequelize() {
        return Database.getInstance().sequelize;
    }
}

export default Database;
