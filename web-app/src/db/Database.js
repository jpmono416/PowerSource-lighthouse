import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "password",
    port: 5432,
});

export default class Database {
    query = async (query, params) => {
        try {
            return await pool.query(query, params);
        } catch (error) {
            console.error("Error executing query: " + error.message);
            throw new Error("Error executing query: " + error.message);
        }
    };

    connect = async () => {
        try {
            await pool.connect();
            console.log("Database connected successfully.");
        } catch (error) {
            console.error("Error connecting to database: " + error.message);
            throw new Error("Error connecting to database: " + error.message);
        }
    };

    disconnect = async () => {
        try {
            await pool.end();
            console.log("Database disconnected successfully.");
        } catch (error) {
            console.error("Error disconnecting from database: " + error.message);
            throw new Error("Error disconnecting from database: " + error.message);
        }
    };
}
