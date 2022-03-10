const mockingoose = require("mockingoose");

const Game = require("../../../database/models/Game");
const listGames = require("./listGames");

afterEach(() => {
  mockingoose.resetAll();
});

describe("Given listrGames controller", () => {
  describe("When it's passed a res and the response goes ok with 2 games", () => {
    test("Then it should call res.json with the 2 games", async () => {
      const games = [
        {
          name: "asdasd",
          duration: 30,
          drunkness: "high",
        },
        {
          name: "asdasd",
          duration: 30,
          drunkness: "medium",
        },
      ];

      mockingoose(Game).toReturn(games, "find");

      const expectedResponse = {
        games: [
          expect.objectContaining(games[0]),
          expect.objectContaining(games[1]),
        ],
      };

      const res = {
        json: jest.fn(),
      };

      await listGames(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's passed a res and the response goes ok with 0 games", () => {
    test("Then it should call res.json with an empty array", async () => {
      const games = null;

      mockingoose(Game).toReturn(games, "find");

      const expectedResponse = {
        games: [],
      };

      const res = {
        json: jest.fn(),
      };

      await listGames(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it's passed a next and something breaks", () => {
    test("Then it should call next the generated error", async () => {
      const error = new Error("some random error");
      mockingoose(Game).toReturn(error, "find");

      const next = jest.fn();

      await listGames(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
