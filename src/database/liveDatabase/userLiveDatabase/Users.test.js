const { Users } = require("./Users");

describe("Given Users.removeUser", () => {
  describe("Wehn it's called with a user that's in a lobby", () => {
    test("Then it should call that user's lobby. removePlayer", () => {
      const users = new Users();

      const mockLobby = {
        removePlayer: jest.fn(),
      };

      const player = {
        id: "plauerId",
        inLobby: true,
        lobby: mockLobby,
      };

      users.appendUser(player);

      users.removeUser(player.id);

      expect(mockLobby.removePlayer).toHaveBeenCalledWith(player.id);
    });
  });
});
