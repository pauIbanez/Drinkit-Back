const User = require("../../database/models/User");
const connectionRouter = require("./connectionRouter/connectionRouter");
const lobbyRouter = require("./lobbyRouter/lobbyRouter");

const router = async (message, connection) => {
  let foundUser;
  let player;
  if (message.reason) {
    foundUser = await User.findById(message.userId);
    if (!foundUser) {
      connection.send(
        JSON.stringify({
          error: true,
          message: "Invalid player",
        })
      );
    }
    player = { id: foundUser.id, profile: foundUser.profile, connection };
  }

  switch (message.reason) {
    case "lobby":
      lobbyRouter(message, connection, player);
      break;

    case "game":
      break;

    case "social":
      break;

    default:
      connectionRouter(message, connection);
      break;
  }
};

module.exports = router;
