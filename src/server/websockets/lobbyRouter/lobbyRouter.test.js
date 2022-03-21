const {
  lobbies,
} = require("../../../database/liveDatabase/lobbiesLiveDatabase/lobbiesLiveDatabase");
const lobbyRouter = require("./lobbyRouter");

describe("Given lobbyRouter", () => {
  beforeEach(() => {
    lobbies.push({
      id: "lobbyId",
    });
  });

  afterEach(() => {
    lobbies.splice(0, lobbies.length - 1);
  });
  describe("When it's instanciated passing a message withoug a game", () => {
    test("Then it should call connection.send with an error", () => {
      const message = {};

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
});
