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
  const mockRemovePlayer = jest.fn();
  beforeEach(() => {
    connectedUsers.length = 0;
    connectedUsers.push({
      id: "playerId",
      inLobby: true,
      lobbyInstance: {
        lobby: {
          removePlayer: mockRemovePlayer,
        },
      },
    });

    connectedUsers.push({
      id: "otherId",
      inLobby: false,
    });
  });

  describe("When it's intanciated passing a userId of a user in a Lobby", () => {
    test("Then it should set the user online to false and remove it from the list", async () => {
      const player = {
        online: true,
        id: "playerId",
        save: jest.fn(),
      };

      User.findById = jest.fn().mockResolvedValue(player);

      const recievedConnectedUsers = await removeUser(player.id);
      expect(player.online).toBe(false);
      expect(recievedConnectedUsers).toHaveLength(1);
      expect(mockRemovePlayer).toHaveBeenCalledWith(player.id);
    });
  });

  describe("When it's intanciated passing a userId of a user", () => {
    test("Then it should set the user online to false and remove it from the list", async () => {
      const player = {
        online: true,
        id: "otherId",
        save: jest.fn(),
      };

      User.findById = jest.fn().mockResolvedValue(player);

      await removeUser(player.id);
      expect(player.online).toBe(false);
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
