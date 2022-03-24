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

  describe("When it's intanciated passing a message with the reason as 'lobby' with invalid user", () => {
    test("Then it should call connection.send with an error", async () => {
      const message = {
        reason: "lobby",
      };
      const connection = {
        send: jest.fn(),
      };

      const expectedError = {
        error: true,
        message: "Invalid player",
      };
      User.findById = jest.fn().mockResolvedValue(null);

      await router(message, connection);

      expect(connection.send).toHaveBeenCalledWith(
        JSON.stringify(expectedError)
      );
    });
  });
});
