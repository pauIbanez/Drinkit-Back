const User = require("../models/User");

let connectedUsers = [];

const addUser = async (userId, connection) => {
  const foundUser = await User.findById(userId);
  foundUser.online = true;
  foundUser.save();

  if (!foundUser) {
    connection.close();
    return;
  }

  // eslint-disable-next-line no-param-reassign
  connection.id = userId;

  connectedUsers.push({ id: userId, connection });
};

const removeUser = async (userId) => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    return;
  }

  foundUser.online = false;
  foundUser.save();

  const newConnections = connectedUsers.filter((conn) => conn.id !== userId);

  connectedUsers = [...newConnections];
};

module.exports = { addUser, removeUser, connectedUsers };
