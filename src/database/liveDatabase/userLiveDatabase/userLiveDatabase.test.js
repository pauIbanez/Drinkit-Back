const User = require("../../models/User");
const { connectedUsers, addUser, removeUser } = require("./userLiveDatabase");

describe("Given add user", () => {
  describe("When it's instanciated passing an invalid userId", () => {
    test("Then it should call connection.close", async () => {
      const connection = {
        close: jest.fn(),
      };

      User.findById = jest.fn().mockResolvedValue(null);

      await addUser("invalid id", connection);

      expect(connection.close).toHaveBeenCalled();
    });
  });

  describe("When it's instanciated passing a valid userId and a conn", () => {
    test("Then it should set the player as online and add it to connectedPlayers", async () => {
      const player = {
        online: false,
        id: "playerId",
        save: jest.fn(),
      };

      const connection = {};

      const expectedUsers = [
        {
          id: player.id,
          connection,
          inLobby: false,
        },
      ];

      User.findById = jest.fn().mockResolvedValue(player);

      await addUser(player.id, connection);

      expect(player.online).toBe(true);
      expect(connection.userId).toBe(player.id);
      expect(connectedUsers).toEqual(expectedUsers);
    });
  });
});

describe("Given removeUser", () => {
  describe("When it's intanciated passing a userId", () => {
    test("Then it should ser the user online to false and remove it from the list", async () => {
      const player = {
        online: true,
        id: "playerId",
        save: jest.fn(),
      };

      connectedUsers.length = 0;
      connectedUsers.push({
        id: player.id,
      });

      const expectedUsers = [];

      User.findById = jest.fn().mockResolvedValue(player);

      const recievedConnectedUsers = await removeUser(player.id);
      expect(player.online).toBe(false);
      expect(recievedConnectedUsers).toEqual(expectedUsers);
    });
  });

  describe("When it's instanciated passing an invalid userId", () => {
    test("Then it should return null", async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const result = await removeUser("invalid id");

      expect(result).toBe(null);
    });
  });
});
