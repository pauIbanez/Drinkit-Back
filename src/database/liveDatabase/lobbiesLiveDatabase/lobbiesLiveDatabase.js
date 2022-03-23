/* eslint-disable no-case-declarations */
const { getId, liberateId } = require("./sharedIds");
const PiramideLobby = require("./piramideLobby/PiramideLobby");
const Lobbies = require("./Lobbies");

const lobbies = new Lobbies();

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

      const lobbyToStore = {
        type: game,
        id: reference.id,
        leader,
        lobby: piramideLobby,
      };

      lobbies.appendLobby(lobbyToStore);
      break;

    default:
      break;
  }
};

const removeLobby = (leaderId) => {
  const foundLobby = lobbies.find(({ leader: { id } }) => id === leaderId);
  liberateId(foundLobby.sharedId);

  lobbies.removeLobby(foundLobby.reference.id);
};

module.exports = { createLobby, removeLobby, lobbies };
