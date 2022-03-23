class Lobbies {
  lobbies = [];

  appendLobby = (lobby) => {
    this.lobbies.push(lobby);
  };

  removeUser = (lobbyId) => {
    const newLobbies = this.lobbies.filter((lobby) => lobby.id !== lobbyId);

    this.lobbies = newLobbies;
  };
}

export default Lobbies;
