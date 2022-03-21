const Room = require("../../../../database/models/Room");
const createRoom = require("./createRoom");

describe("Given createRoom", () => {
  describe("When it's instanciated passing a req with the roomData, and a res and create is ok", () => {
    test("When it should call res.status with 201 and res.json with an empty object", async () => {
      const expectedCode = 201;

      const req = {
        body: {
          game: "8796ahsaiudas876",
        },
        user: {
          id: "sadasdas890dsa89d",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const createdRoom = {
        leader: {
          id: "id",
          profile: {
            username: "username",
          },
        },
        game: {
          id: "gameId",
          name: "piramide",
        },
      };

      Room.create = jest.fn().mockResolvedValue({ id: "" });
      Room.findById = jest.fn().mockReturnThis();
      Room.populate = jest.fn().mockResolvedValue(createdRoom);

      await createRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it's instanciated passing a req with the roomData and a next and create is NOT ok", () => {
    test("When it should call next with an error", async () => {
      const error = new Error("some error");

      const req = {
        body: {
          game: "8796ahsaiudas876",
        },
        user: {
          id: "sadasdas890dsa89d",
        },
      };

      const next = jest.fn();

      Room.create = jest.fn().mockRejectedValue(error);

      await createRoom(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
