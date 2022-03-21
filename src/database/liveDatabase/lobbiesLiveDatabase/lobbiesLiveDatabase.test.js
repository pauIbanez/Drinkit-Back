const { createLobby, lobbies, removeLobby } = require("./lobbiesLiveDatabase");

describe("Given createLobby", () => {
  describe("When it's intanciated passing a piramide game and a leader", () => {
    test("then it should create a new PiramideLobby and insert it into the lobbies array", () => {
      const leader = {
        id: "id",
        profile: {
          username: "leader test",
        },
      };
      const game = "Piramide";

      const expectedLobbies = [
        expect.objectContaining({
          type: game,
          id: "roomid",
          leader,
          lobby: expect.objectContaining({
            leader,
          }),
        }),
      ];

      createLobby(game, leader);

      expect(lobbies).toEqual(expectedLobbies);

      lobbies.length = 0;
    });
  });
});

describe("Given removeLobby", () => {
  describe("When it's intanciated passing a leader id", () => {
    test("Then it should eliminiate the lobby with that leader id", () => {
      lobbies.push({
        leader: {
          id: "leaderId",
        },
      });

      const returnedLobbies = removeLobby("leaderId");

      expect(returnedLobbies).toEqual([]);
    });
  });
});
