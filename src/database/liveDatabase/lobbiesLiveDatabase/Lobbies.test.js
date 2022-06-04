const { Lobbies } = require("./Lobbies");

describe("Given Lobbies.findLobby", () => {
  describe("When it's instanciated passing a valid lobby normal id", () => {
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

  describe("When it's instanciated passing a valid lobby shared id", () => {
    test("Then it should return the found lobby", () => {
      const lobbies = new Lobbies();

      const lobby = {
        sharedId: "lobbySharedId",
      };

      lobbies.appendLobby(lobby);

      const foundLobby = lobbies.findLobby(lobby.sharedId);

      expect(foundLobby).toEqual(lobby);
    });
  });
});
