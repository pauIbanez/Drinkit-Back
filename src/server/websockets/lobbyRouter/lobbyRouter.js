const {
  lobbies,
} = require("../../../database/liveDatabase/lobbiesLiveDatabase/Lobbies");
const piramideLobbyRouter = require("./piramideLobbyRouter/piramideLobbyRouter");

const lobbyRouter = (message, connection, player) => {
  let foundLobby;
  if (message.game) {
    foundLobby = lobbies.findLobby(message.lobby);
    if (!foundLobby) {
      connection.send(
        JSON.stringify({ error: true, message: "Lobby not found" })
      );
      return;
    }
  }

  switch (message.game) {
    case "piramide":
      piramideLobbyRouter(message, foundLobby, player);
      break;

    default:
      break;
  }
};

module.exports = lobbyRouter;
