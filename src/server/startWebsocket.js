const WebSocket = require("ws");
const messageRouter = require("./websockets/router/router");

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
      messageRouter(parsedMessage, websocketConnection);
    });

    websocketConnection.on("close", () => {
      messageRouter({ type: "close", id: websocketConnection.id });
    });
  });

  return websocketServer;
};

module.exports = startWebscokets;
