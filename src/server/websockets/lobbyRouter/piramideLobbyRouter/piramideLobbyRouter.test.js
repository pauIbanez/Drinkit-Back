const {
  users,
} = require("../../../../database/liveDatabase/userLiveDatabase/Users");
const piramideLobbyRouter = require("./piramideLobbyRouter");

describe("Given piramideLobbyRouter", () => {
  describe("When it's passed a messagewithout type", () => {
    test("Then it should so nothing", () => {
      const message = {};

      const lobby = {
        appendPlayer: jest.fn(),
      };

      const player = {
        id: "userId",
      };

      piramideLobbyRouter(message, lobby, player);

      expect(lobby.appendPlayer).not.toHaveBeenCalled();
    });
  });

  describe("When it's passed a message with type join and a lobby", () => {
    test("Then it should call the lobby's append player", () => {
      const message = {
        type: "join",
      };

      const lobby = {
        appendPlayer: jest.fn(),
      };

      const player = {
        id: "userId",
      };

      users.appendUser(player);

      piramideLobbyRouter(message, lobby, player);

      expect(lobby.appendPlayer).toHaveBeenCalledWith(player);
    });
  });
});
