const WebSocket = require("ws");

const startWebscokets = (app) => {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/ws",
  });

  app.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  websocketServer.on("connection", (websocketConnection) => {
    websocketConnection.on("message", (message) => {
      const parsedMessage = JSON.parse(message);

      websocketConnection.send(JSON.stringify(parsedMessage));
    });
  });

  return websocketServer;
};

module.exports = startWebscokets;
