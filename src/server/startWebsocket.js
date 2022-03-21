const WebSocket = require("ws");
const router = require("./websockets/router");

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

      router(parsedMessage, websocketConnection);
    });

    websocketConnection.on("close", () => {
      router({ type: "close", id: websocketConnection.id });
    });
  });

  return websocketServer;
};

module.exports = startWebscokets;
