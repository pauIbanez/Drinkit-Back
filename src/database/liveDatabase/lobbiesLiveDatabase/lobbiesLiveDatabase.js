/* eslint-disable no-case-declarations */
const PiramideLobby = require("./piramideLobby/PiramideLobby");

const lobbies = [];

const createLobby = (lobby) => {
  const reference = {
    id: "roomid",
    sharedId: "roomshareCode",
  };

  switch (lobby.type) {
    case "piramide":
      const piramideLobby = new PiramideLobby(
        lobby.config,
        lobby.leader,
        reference
      );

      const lobbyToStore = {
        type: lobby.type,
        lobby: piramideLobby,
      };

      lobbies.push(lobbyToStore);
      break;

    default:
      break;
  }
};

module.exports = { createLobby };
