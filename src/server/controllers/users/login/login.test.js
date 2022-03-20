require("dotenv").config();
const jwt = require("jsonwebtoken");
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
        token: "token",
      };

      User.findOne = jest.fn().mockResolvedValue(foundUser);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("token");

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedRes);
    });
  });

  describe("When it's passed a username that does not exist", () => {
    test("Then it should call next with an error with code 401 and message 'Incorrect username or password'", async () => {
      const req = {
        body: {
          username: "username",
          password: "password",
        },
      };

      const next = jest.fn();

      const expectedError = {
        code: 401,
        send: "Incorrect username or password",
      };

      User.findOne = jest.fn().mockResolvedValue(null);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed an invalid password", () => {
    test("Then it should call next with an error with code 401 and message 'Incorrect username or password'", async () => {
      const req = {
        body: {
          username: "username",
          password: "password",
        },
      };

      const next = jest.fn();

      const expectedError = {
        code: 401,
        send: "Incorrect username or password",
      };

      const foundUser = {
        id: "oyeah",
        credentials: {
          password: "somepassword",
        },
      };

      User.findOne = jest.fn().mockResolvedValue(foundUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await login(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
