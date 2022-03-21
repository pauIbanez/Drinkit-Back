const piramideLobbyRouter = async (
  message,
  connection,
  lobbyInstance,
  player
) => {
  // eslint-disable-next-line no-param-reassign
  player.connection = connection;

  player.connection.send(
    JSON.stringify(`Welcome ${player.profile.username} from player`)
  );
  switch (message.type) {
    case "join":
      lobbyInstance.lobby.appendPlayer(player);
      break;
    default:
      break;
  }
};

module.exports = piramideLobbyRouter;
