const debug = require("debug")("drinkit:liveDatabase");

const chalk = require("chalk");
const User = require("../../models/User");
const { users } = require("./Users");

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
  const user = {
    id: userId,
    connection,
    inLobby: false,
  };

  users.appendUser(user);
};

const removeUser = async (userId) => {
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    debug(chalk.redBright("User not found on remove"));
    return;
  }

  foundUser.online = false;
  foundUser.save();

  users.removeUser(userId);
};

module.exports = { addUser, removeUser };
