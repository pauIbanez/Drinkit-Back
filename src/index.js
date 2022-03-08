require("dotenv").config();
const debug = require("debug")("drinkit:root");

const connectToDB = require("./database");
const app = require("./server");
const startServer = require("./server/startServer");

const port = +process.env.PORT || 4000;
const connectionString = process.env.CONN_STRING;

(async () => {
  try {
    await startServer(port, app);
    await connectToDB(connectionString);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
