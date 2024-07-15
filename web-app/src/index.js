import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";

Config.load();
const { PORT, HOST, CLIENT_URL } = process.env;

// Add Routes
const server = new Server(PORT, HOST, CLIENT_URL);
const database = new Database();

server.start();
await database.connect();
