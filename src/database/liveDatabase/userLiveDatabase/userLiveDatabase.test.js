const User = require("../../models/User");
const { connectedUsers, addUser } = require("./userLiveDatabase");

describe("Given add user", () => {
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
