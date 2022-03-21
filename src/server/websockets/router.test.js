const {
  connectedUsers,
} = require("../../database/liveDatabase/userLiveDatabase/userLiveDatabase");
const User = require("../../database/models/User");
const connectionRouter = require("./connectionRouter/connectionRouter");
const lobbyRouter = require("./lobbyRouter/lobbyRouter");
const router = require("./router");

jest.mock("./connectionRouter/connectionRouter");
jest.mock("./lobbyRouter/lobbyRouter");

describe("Given router", () => {
  describe("When it's intanciated passing a message without reason", () => {
    test("Then it should call connectionRouter", () => {
      const message = {};
      const connection = {};
      router(message, connection);

      expect(connectionRouter).toHaveBeenCalledWith(message, connection);
    });
  });

  describe("When it's intanciated passing a message with the reason as 'lobby'", () => {
    beforeEach(() => {
      connectedUsers.push({
        id: "playerId",
        profile: {},
        connection: {},
      });
    });
    test("Then it should call lobbyRouter", async () => {
      const message = {
        reason: "lobby",
      };
      const connection = {};
      const expectedPlayer = {
        id: "playerId",
        profile: {},
        connection: {},
      };

      const player = {
        id: "playerId",
        profile: {},
      };
      User.findById = jest.fn().mockResolvedValue(player);

      await router(message, connection);

      expect(lobbyRouter).toHaveBeenCalledWith(
        message,
        connection,
        expectedPlayer
      );
    });
  });
});
