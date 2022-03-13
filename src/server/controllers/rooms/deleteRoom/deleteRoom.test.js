const Room = require("../../../../database/models/Room");
const deleteRoom = require("./deleteRoom");

describe("Given deleteRoom", () => {
  describe("when it recieves a req with the user and everything goes ok", () => {
    test("Then it should call res.json with an empty object", async () => {
      const req = {
        user: {
          id: "userId",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const foundRoom = {
        id: "roomId",
      };

      Room.findOne = jest.fn().mockResolvedValue(foundRoom);
      Room.findByIdAndDelete = jest.fn().mockResolvedValue();

      await deleteRoom(req, res);

      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe("when it recieves a req with the user and the user room is not found", () => {
    test("Then it should call next with an error with code 404 and message 'No rooms found'", async () => {
      const req = {
        user: {
          id: "userId",
        },
      };

      const next = jest.fn();

      const expectedError = {
        code: 404,
        send: "No rooms found",
      };

      Room.findOne = jest.fn().mockResolvedValue(null);

      await deleteRoom(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
