const User = require("../../models/User");
const { addUser, removeUser } = require("./userLiveDatabase");
const { users } = require("./Users");

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
    test("Then it should set the player as online and call the users.appendUser", async () => {
      const player = {
        online: false,
        id: "playerId",
        save: jest.fn(),
      };

      const connection = {};

      const spyAppend = jest.spyOn(users, "appendUser");

      User.findById = jest.fn().mockResolvedValue(player);

      await addUser(player.id, connection);

      expect(player.online).toBe(true);
      expect(connection.userId).toBe(player.id);
      expect(spyAppend).toHaveBeenCalled();
    });
  });
});

describe("Given removeUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("When it's intanciated passing a userId of a user in a Lobby", () => {
    test("Then it should set the user online to false and remove it from the list", async () => {
      const player = {
        online: true,
        id: "playerId",
        save: jest.fn(),
      };

      users.appendUser(player);

      User.findById = jest.fn().mockResolvedValue(player);
      const spyRemove = jest.spyOn(users, "removeUser");

      await removeUser(player.id);
      expect(player.online).toBe(false);
      expect(spyRemove).toHaveBeenCalled();
    });
  });

  describe("When it's instanciated passing an invalid userId", () => {
    test("Then it should do nothing", async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      await removeUser("invalid id");

      const spyRemove = jest.spyOn(users, "removeUser");

      expect(spyRemove).not.toHaveBeenCalled();
    });
  });
});
