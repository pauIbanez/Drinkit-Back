const {
  lobbies,
} = require("../../../database/liveDatabase/lobbiesLiveDatabase/lobbiesLiveDatabase");
const lobbyRouter = require("./lobbyRouter");
const piramideLobbyRouter = require("./piramideLobbyRouter/piramideLobbyRouter");

jest.mock("./piramideLobbyRouter/piramideLobbyRouter");

describe("Given lobbyRouter", () => {
  beforeEach(() => {
    lobbies.push({
      id: "lobbyId",
    });
  });

  afterEach(() => {
    lobbies.splice(0, lobbies.length - 1);
  });
  describe("When it's instanciated passing a message withoug a valid lobby", () => {
    test("Then it should call connection.send with an error", () => {
      const message = {
        game: "piramide",
      };

      const connection = {
        send: jest.fn(),
      };

      const expectedError = {
        error: true,
        message: "Lobby not found",
      };

      lobbyRouter(message, connection);

      expect(connection.send).toHaveBeenCalledWith(
        JSON.stringify(expectedError)
      );
    });
  });

  describe("When it's instanciated passing a message withoug a game", () => {
    test("Then it should do nothing", () => {
      const message = {};

      const connection = {
        send: jest.fn(),
      };

      lobbyRouter(message, connection);
    });
  });

  describe("When it's instanciated passing a message with game piramide and a valid lobby", () => {
    test("Then it should call piramideLobbyRouter", () => {
      const message = {
        game: "piramide",
        lobby: "lobbyId",
      };

      const player = {
        id: "playerId",
      };

      const expectedLobby = {
        id: "lobbyId",
      };
      lobbyRouter(message, null, player);

      expect(piramideLobbyRouter).toHaveBeenCalledWith(
        message,
        expectedLobby,
        player
      );
    });
  });
});
