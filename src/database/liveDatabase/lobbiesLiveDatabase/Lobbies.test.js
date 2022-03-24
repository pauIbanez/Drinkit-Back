const { Lobbies } = require("./Lobbies");

describe("Given Lobbies.findLobby", () => {
  describe("When it's instanciated passing a valid if", () => {
    test("Then it should return the found lobby", () => {
      const lobbies = new Lobbies();

      const lobby = {
        id: "lobbyId",
      };

      lobbies.appendLobby(lobby);

      const foundLobby = lobbies.findLobby(lobby.id);

      expect(foundLobby).toEqual(lobby);
    });
  });
});
