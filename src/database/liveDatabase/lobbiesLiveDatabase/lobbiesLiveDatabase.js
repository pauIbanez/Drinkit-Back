/* eslint-disable no-case-declarations */
const { getId, liberateId } = require("./sharedIds");
const PiramideLobby = require("./piramideLobby/PiramideLobby");
const { lobbies } = require("./Lobbies");

const createLobby = (game, leader, roomId) => {
  const reference = {
    id: roomId,
    sharedId: getId(),
  };

  const leaderPlayer = { id: leader.id, profile: leader.profile };

  switch (game.toLowerCase()) {
    case "piramide":
      const defaultConfig = {
        leftovers: false,
        modifiers: [],
        twoDecks: false,
        jokers: false,
      };

      const piramideLobby = new PiramideLobby(
        defaultConfig,
        leaderPlayer,
        reference
      );

      lobbies.appendLobby(piramideLobby);
      break;

    default:
      break;
  }
};

const removeLobby = (leaderId) => {
  const foundLobby = lobbies.findLobbyByLeader(leaderId);

  liberateId(foundLobby.sharedId);

  lobbies.removeLobby(foundLobby.id);
};

module.exports = { createLobby, removeLobby, lobbies };
