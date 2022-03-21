const {
  addUser,
  removeUser,
} = require("../../../database/liveDatabase/userLiveDatabase/userLiveDatabase");

const connectionRouter = async (message, connection) => {
  switch (message.type) {
    case "conn-open":
      await addUser(message.userId, connection);
      break;

    case "close":
      await removeUser(message.userId);
      break;

    default:
      break;
  }
};

module.exports = connectionRouter;
