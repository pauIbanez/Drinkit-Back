const User = require("../../models/User");

let connectedUsers = [];

const addUser = async (userId, connection) => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    connection.close();
    return;
  }
  foundUser.online = true;
  foundUser.save();

  // eslint-disable-next-line no-param-reassign
  connection.userId = userId;

  connectedUsers.push({ id: userId, connection, inLobby: false });
};

const removeUser = async (userId) => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    return null;
  }

  foundUser.online = false;
  foundUser.save();

  const foundConnectedUser = connectedUsers.find((user) => user.id === userId);

  if (foundConnectedUser.inLobby) {
    foundConnectedUser.lobbyInstance.lobby.removePlayer(userId);
  }

  const newConnections = connectedUsers.filter((user) => user.id !== userId);

  connectedUsers = [...newConnections];

  return connectedUsers;
};

module.exports = { addUser, removeUser, connectedUsers };
