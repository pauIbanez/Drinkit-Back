require("dotenv").config();
const debug = require("debug")("drinkit:root");

const app = require("./server");
const startServer = require("./server/startServer");

const port = +process.env.PORT || 4000;

(async () => {
  try {
    await startServer(port, app);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
