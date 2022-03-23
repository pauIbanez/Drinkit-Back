/* eslint-disable no-case-declarations */

const {
  users,
} = require("../../../../database/liveDatabase/userLiveDatabase/Users");

const piramideLobbyRouter = (message, lobby, player) => {
  switch (message.type) {
    case "join":
      lobby.appendPlayer(player);

      const foundUser = users.findUser(player.id);

      foundUser.inLobby = true;
      foundUser.lobby = lobby;
      break;
    default:
      break;
  }
};

module.exports = piramideLobbyRouter;
