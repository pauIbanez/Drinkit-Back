const Room = require("../../../database/models/Room");
const validateCreate = require("./validateCreate");

describe("Given validateCreate", () => {
  describe("When it's instanciated with a req with a user that has no other rooms and a next", () => {
    test("Then it should call next with nothing", async () => {
      const req = {
        user: { id: "userId" },
      };

      const next = jest.fn();
      Room.findOne = jest.fn().mockResolvedValue(null);

      await validateCreate(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's instanciated with a req with a user that has another room and a next", () => {
    test("Then it should call next with an error with code 403 and message containing the room id", async () => {
      const foundRoom = {
        id: "roomid",
      };

      const expectedError = {
        code: 403,
        send: "Room already active for this player: roomid",
      };

      const req = {
        user: { id: "userId" },
      };

      const next = jest.fn();
      Room.findOne = jest.fn().mockResolvedValue(foundRoom);

      await validateCreate(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
