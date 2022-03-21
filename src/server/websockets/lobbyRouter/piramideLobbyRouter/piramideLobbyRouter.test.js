const {
  connectedUsers,
} = require("../../../../database/liveDatabase/userLiveDatabase/userLiveDatabase");
const piramideLobbyRouter = require("./piramideLobbyRouter");

describe("Given piramideLobbyRouter", () => {
  beforeEach(() => {
    connectedUsers.push({
      id: "userId",
    });
  });
  describe("When it's passed a message with type join and a lobby", () => {
    test("Then it should call the lobby's append player", () => {
      const message = {
        type: "join",
      };

      const lobbyInstance = {
        lobby: {
          appendPlayer: jest.fn(),
        },
      };

      const player = {
        id: "userId",
      };

      piramideLobbyRouter(message, lobbyInstance, player);

      expect(lobbyInstance.lobby.appendPlayer).toHaveBeenCalledWith(player);
    });
  });
});
