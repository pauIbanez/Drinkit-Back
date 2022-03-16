const jwt = require("jsonwebtoken");

const User = require("../../../../database/models/User");
const activate = require("./activate");

describe("Given activate", () => {
  describe("When it's instanciated with a req with params and everything ok", () => {
    test("Then it should call res.json with an empty object", async () => {
      const req = {
        params: {
          activationToken: "token",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const expectedResult = {};

      jwt.verify = jest.fn().mockReturnValue({ id: "userId" });
      User.findById = jest.fn().mockResolvedValue(null);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue();

      await activate(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });
});
