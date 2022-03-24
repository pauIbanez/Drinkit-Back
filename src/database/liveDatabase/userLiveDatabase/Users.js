class Users {
  users = [];

  appendUser = (user) => {
    this.users.push(user);
  };

  removeUser = (userId) => {
    const foundUser = this.users.find((user) => user.id === userId);

    if (foundUser.inLobby) {
      foundUser.lobby.removePlayer(userId);
    }

    const newUsers = this.users.filter((user) => user.id !== userId);

    this.users = newUsers;
  };

  findUser = (userId) => this.users.find((user) => user.id === userId);
}

const users = new Users();

module.exports = { users, Users };
