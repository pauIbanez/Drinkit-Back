require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../../../../database/models/User");
const login = require("./login");

describe("Given login", () => {
  describe("When it's passed valid data", () => {
    test("Then it should call res.json with a token", async () => {
      const req = {
        body: {
          username: "username",
          password: "password",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const foundUser = {
        id: "oyeah",
        credentials: {
          password: "somepassword",
        },
      };

      const expectedRes = {
        token: expect.any(String),
      };

      User.findOne = jest.fn().mockResolvedValue(foundUser);
      bcrypt.compare = jest.fn().mockReturnValue(true);

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedRes);
    });
  });
});
