const debug = require("debug")("drinkit:server");

const startServer = (port, app) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      const portString = port === 80 ? "" : `:${port}`;
      debug(`Server listening on http://localhost${portString}`);
      resolve();
    });

    server.on("error", (error) => {
      const messageString =
        error.code === "EADDRINUSE" ? ` Port ${port} in use` : error.message;

      const errorMessage = `Couldn't start the server. ${messageString}`;
      reject(new Error(errorMessage));
    });
  });

module.exports = startServer;
