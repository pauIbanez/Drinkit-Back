class Users {
  users = [];

  appendUser = (user) => {
    this.users.push(user);
  };

  removeUser = (userId) => {
    const foundUser = this.users.find((user) => user.id === userId);

    if (foundUser.inLobby) {
      foundUser.lobbyInstance.lobby.removePlayer(userId);
    }

    const newUsers = this.users.filter((user) => user.id !== userId);

    this.users = newUsers;
  };
}

module.exports = Users;
