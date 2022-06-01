const chalk = require("chalk");

const debug = require("debug")("drinkit:liveDatabase:lobbies");

class Lobbies {
  lobbies = [];

  appendLobby = (lobby) => {
    this.lobbies.push(lobby);
  };

  removeLobby = (lobbyId) => {
    const newLobbies = this.lobbies.filter((lobby) => lobby.id !== lobbyId);

    this.lobbies = newLobbies;

    debug(chalk.yellowBright(`Lobby removed | ${lobbyId}`));
  };

  findLobby = (lobbyId) =>
    this.lobbies.find(
      (lobby) => lobby.id === lobbyId || lobby.sharedId === lobbyId
    );

  findLobbyByLeader = (leaderId) =>
    this.lobbies.find((lobby) => lobby.leader.id === leaderId);
}

const lobbies = new Lobbies();

module.exports = { lobbies, Lobbies };
