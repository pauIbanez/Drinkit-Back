const mockingoose = require("mockingoose");
const Room = require("../../../../database/models/Room");

const listRooms = require("./listRooms");

afterEach(() => {
  mockingoose.resetAll();
});

describe("Given listRooms controller", () => {
  describe("When it's passed a res and the response goes ok with 2 rooms", () => {
    test("Then it should call res.json with the 2 rooms", async () => {
      const rooms = [
        {
          inGame: false,
          inLobby: true,
          isActive: true,
          players: [],
        },
        {
          inGame: false,
          inLobby: true,
          isActive: true,
          players: [],
        },
      ];

      mockingoose(Room).toReturn(rooms, "find");

      const expectedResponse = {
        rooms: [
          expect.objectContaining(rooms[0]),
          expect.objectContaining(rooms[1]),
        ],
      };

      const res = {
        json: jest.fn(),
      };

      await listRooms(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's passed a res and the response goes ok with 0 rooms", () => {
    test("Then it should call res.json with an empty array", async () => {
      const rooms = null;

      mockingoose(Room).toReturn(rooms, "find");

      const expectedResponse = {
        rooms: [],
      };

      const res = {
        json: jest.fn(),
      };

      await listRooms(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's passed a next and something breaks", () => {
    test("Then it should call next the generated error", async () => {
      const error = new Error("some random error");
      mockingoose(Room).toReturn(error, "find");

      const next = jest.fn();

      await listRooms(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
