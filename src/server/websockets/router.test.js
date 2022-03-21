const connectionRouter = require("./connectionRouter/connectionRouter");
const router = require("./router");

jest.mock("./connectionRouter/connectionRouter");

describe("Given router", () => {
  describe("When it's intanciated passing a message without reason", () => {
    test("When it should call connectionRouter", () => {
      const message = {};
      const connection = {};
      router(message, connection);

      expect(connectionRouter).toHaveBeenCalledWith(message, connection);
    });
  });
});
