/* eslint-disable no-case-declarations */
const { getId, liberateId } = require("./getLobbyShareId");
const PiramideLobby = require("./piramideLobby/PiramideLobby");

let lobbies = [];

const createLobby = (game, leader, roomId) => {
  const reference = {
    id: roomId,
    sharedId: getId(),
  };

  switch (game.toLowerCase()) {
    case "piramide":
      const defaultConfig = {
        leftovers: false,
        modifiers: [],
        twoDecks: false,
        jokers: false,
      };

      const piramideLobby = new PiramideLobby(defaultConfig, leader, reference);

      const lobbyToStore = {
        type: game,
        id: reference.id,
        leader,
        lobby: piramideLobby,
      };

      lobbies.push(lobbyToStore);
      break;

    default:
      break;
  }
};

const removeLobby = (leaderId) => {
  const foundLobby = lobbies.find(({ leader: { id } }) => id === leaderId);
  const newLobbies = lobbies.filter(({ leader: { id } }) => id !== leaderId);
  liberateId(foundLobby.sharedId);
  lobbies = [...newLobbies];
  return lobbies;
};

module.exports = { createLobby, removeLobby, lobbies };
