const {
  addUser,
  removeUser,
} = require("../../../database/liveDatabase/liveDatabase");

const messageRouter = async (message, connection) => {
  switch (message.type) {
    case "conn-open":
      await addUser(message.id, connection);
      break;

    case "close":
      await removeUser(message.id);
      break;

    default:
      break;
  }
};

module.exports = messageRouter;
