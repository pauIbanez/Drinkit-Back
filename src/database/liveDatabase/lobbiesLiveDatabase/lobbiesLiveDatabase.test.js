const { Lobbies } = require("./Lobbies");
const { createLobby, removeLobby } = require("./lobbiesLiveDatabase");

const mockLobbies = new Lobbies();

jest.mock("./Lobbies", () => ({
  lobbies: mockLobbies,
}));

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

      createLobby(game, leader, "roomid");

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
