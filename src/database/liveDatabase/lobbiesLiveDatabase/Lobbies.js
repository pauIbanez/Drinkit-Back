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

  findLobby = (lobbyId) => {
    const foundLobby = this.lobbies.find((lobby) => lobby.id === lobbyId);
    return foundLobby;
  };

  findLobbyByLeader = (leaderId) => {
    const foundLobby = this.lobbies.find(
      (lobby) => lobby.leader.id === leaderId
    );
    return foundLobby;
  };
}

const lobbies = new Lobbies();

module.exports = { lobbies, Lobbies };
