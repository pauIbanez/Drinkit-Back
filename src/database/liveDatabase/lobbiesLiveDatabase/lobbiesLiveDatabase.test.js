const { lobbies } = require("./Lobbies");
const { createLobby, removeLobby } = require("./lobbiesLiveDatabase");

describe("Given createLobby", () => {
  describe("When it's intanciated passing a piramide game and a leader", () => {
    test("then it should create a new PiramideLobby and insert it into the lobbies array", () => {
      const leader = {
        id: "id",
        profile: {
          username: "leader test",
        },
      };
      const game = "piramide";

      const spyAppend = jest.spyOn(lobbies, "appendLobby");

      createLobby(game, leader, "roomid");

      expect(spyAppend).toHaveBeenCalled();
    });
  });
});

describe("Given removeLobby", () => {
  describe("When it's intanciated passing a leader id", () => {
    test("Then it should eliminiate the lobby with that leader id", () => {
      const leaderId = "leaderId";

      const lobby = {
        game: "piramide",
        id: "lobbyId",
        leader: {
          id: leaderId,
        },
      };

      const spyRemove = jest.spyOn(lobbies, "removeLobby");

      lobbies.appendLobby(lobby);

      removeLobby(leaderId);

      expect(spyRemove).toHaveBeenCalled();
    });
  });
});
