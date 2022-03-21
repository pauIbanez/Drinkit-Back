const User = require("../../models/User");
const { connectedUsers, addUser } = require("./userLiveDatabase");

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
        },
      ];

      User.findById = jest.fn().mockResolvedValue(player);

      await addUser(player.id, connection);

      expect(player.online).toBe(true);
      expect(connection.id).toBe(player.id);
      expect(connectedUsers).toEqual(expectedUsers);
    });
  });
});
