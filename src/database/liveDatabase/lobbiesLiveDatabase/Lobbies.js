class Lobbies {
  lobbies = [];

  appendLobby = (lobby) => {
    this.lobbies.push(lobby);
  };

  removeLobby = (lobbyId) => {
    const newLobbies = this.lobbies.filter(
      (lobby) => lobby.reference.id !== lobbyId
    );

    this.lobbies = newLobbies;
  };
}

module.exports = Lobbies;
