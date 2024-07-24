import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";

Config.load();
const { SERVER_PORT, SERVER_HOST, CLIENT_URL } = process.env;

const database = Database.getInstance();
await database.connect();

// Start server and db connection
const server = new Server(SERVER_PORT, SERVER_HOST, CLIENT_URL);

server.start();
