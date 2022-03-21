const {
  addUser,
  removeUser,
} = require("../../../database/liveDatabase/userLiveDatabase/userLiveDatabase");
const connectionRouter = require("./connectionRouter");

jest.mock(
  "../../../database/liveDatabase/userLiveDatabase/userLiveDatabase",
  () => ({
    addUser: jest.fn(),
    removeUser: jest.fn(),
  })
);

describe("Given connectionRouter", () => {
  describe("When it's instanciated with a message with no type", () => {
    test("Then it should do nothing", async () => {
      const message = {};
      const connection = {};

      await connectionRouter(message, connection);
    });
  });

  describe("When it's instanciated with a message with type 'conn-open'", () => {
    test("Then it should call addUser", async () => {
      const message = {
        type: "conn-open",
        userId: "userId",
      };
      const connection = {};

      await connectionRouter(message, connection);

      expect(addUser).toHaveBeenCalledWith(message.userId, connection);
    });
  });

  describe("When it's instanciated with a message with type 'close'", () => {
    test("Then it should call removeUser", async () => {
      const message = {
        type: "close",
        userId: "userId",
      };
      const connection = {};

      await connectionRouter(message, connection);

      expect(removeUser).toHaveBeenCalledWith(message.userId);
    });
  });
});
