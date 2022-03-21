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
  connection.id = userId;

  connectedUsers.push({ id: userId, connection });
};

const removeUser = async (userId) => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    return null;
  }

  foundUser.online = false;
  foundUser.save();

  const newConnections = connectedUsers.filter((conn) => conn.id !== userId);

  connectedUsers = [...newConnections];

  return connectedUsers;
};

module.exports = { addUser, removeUser, connectedUsers };
