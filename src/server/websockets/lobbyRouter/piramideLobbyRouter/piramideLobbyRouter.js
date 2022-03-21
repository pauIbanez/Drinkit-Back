const piramideLobbyRouter = async (
  message,
  connection,
  lobbyInstance,
  player
) => {
  // eslint-disable-next-line no-param-reassign
  player.connection = connection;

  switch (message.type) {
    case "join":
      lobbyInstance.lobby.appendPlayer(player);
      break;
    default:
      break;
  }
};

module.exports = piramideLobbyRouter;
