/* eslint-disable no-case-declarations */
const {
  connectedUsers,
} = require("../../../../database/liveDatabase/userLiveDatabase/userLiveDatabase");

const piramideLobbyRouter = async (message, lobbyInstance, player) => {
  switch (message.type) {
    case "join":
      lobbyInstance.lobby.appendPlayer(player);

      const foundUser = connectedUsers.find((user) => user.id === player.id);

      foundUser.inLobby = true;
      foundUser.lobbyInstance = lobbyInstance;
      break;
    default:
      break;
  }
};

module.exports = piramideLobbyRouter;
