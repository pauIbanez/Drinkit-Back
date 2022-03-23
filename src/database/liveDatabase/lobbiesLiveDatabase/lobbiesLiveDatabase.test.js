const { createLobby, removeLobby } = require("./lobbiesLiveDatabase");
const AllLobbies = require("./Lobbies");

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

      const mockLobbies = new AllLobbies.Lobbies();
      AllLobbies.lobbies = mockLobbies;

      createLobby(game, leader, "roomid");

      const expectedLobbies = [
        expect.objectContaining({
          id: "roomId",
          leader: {
            id: "id",
          },
        }),
      ];

      expect(mockLobbies.lobbies).toEqual(expectedLobbies);
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
