class Users {
  users = [];

  appendUser = (user) => {
    this.users.push(user);
  };

  removeUser = (userId) => {
    const newUsers = this.users.filter((user) => user.id !== userId);

    this.users = newUsers;
  };
}

export default Users;
