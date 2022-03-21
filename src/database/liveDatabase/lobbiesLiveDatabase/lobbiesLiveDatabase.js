/* eslint-disable no-case-declarations */
const PiramideLobby = require("./piramideLobby/PiramideLobby");

let lobbies = [];

const createLobby = (game, leader, roomId) => {
  const reference = {
    id: roomId,
    sharedId: "roomshareCode",
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
  const newLobbies = lobbies.filter(({ leader: { id } }) => id !== leaderId);

  lobbies = [...newLobbies];

  return lobbies;
};

module.exports = { createLobby, removeLobby, lobbies };
