/* eslint-disable no-case-declarations */

const {
  users,
} = require("../../../../database/liveDatabase/userLiveDatabase/Users");

const piramideLobbyRouter = (message, lobby, player) => {
  switch (message.type) {
    case "join":
      lobby.appendPlayer(player);

      const joinUser = users.findUser(player.id);

      joinUser.inLobby = true;
      joinUser.lobby = lobby;
      break;

    case "leave":
      lobby.removePlayer(player.id);

      const leaveUser = users.findUser(player.id);

      leaveUser.inLobby = false;
      leaveUser.lobby = null;
      break;
    default:
      break;
  }
};

module.exports = piramideLobbyRouter;
