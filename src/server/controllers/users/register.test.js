const jwt = require("jsonwebtoken");

const User = require("../../../database/models/User");
const register = require("./register");

describe("Given register controller", () => {
  const name = "nein";
  const lastName = "lasname";
  const email = "imail";
  const username = "usernaim";
  const password = "passguord";

  describe("When it's passed a req with a valid user but username is repeated", () => {
    test("Then it should invoke next with the error 'username' and code 409", async () => {
      const req = {
        body: {
          name,
          lastName,
          email,
          username,
          password,
        },
      };

      User.create = jest
        .fn()
        .mockRejectedValue(
          new Error("Path `username` is marked as unique o noseque")
        );

      const expectedError = {
        code: 409,
        send: "username",
      };

      const next = jest.fn();

      await register(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a req with a valid user but email is repeated", () => {
    test("Then it should invoke next with the error 'email' and code 409", async () => {
      const req = {
        body: {
          name,
          lastName,
          email,
          username,
          password,
        },
      };

      User.create = jest
        .fn()
        .mockRejectedValue(
          new Error("Path `email` is marked as unique o noseque")
        );

      const expectedError = {
        code: 409,
        send: "email",
      };

      const next = jest.fn();

      await register(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a req with a valid user and it gets created ok, but jwt fails", () => {
    test("Then it should invoke next with the error and delete the created user", async () => {
      const req = {
        body: {
          name,
          lastName,
          email,
          username,
          password,
        },
      };

      const createdUser = { ...req.body, id: "32434524563sad213342hjgf" };

      jwt.sign = jest.fn().mockImplementation(() => {
        throw new Error("some error");
      });
      User.create = jest.fn().mockResolvedValue(createdUser);
      User.findByIdAndDelete = jest.fn().mockResolvedValue();

      const expectedError = new Error("some error");

      const next = jest.fn();

      await register(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      jest.resetAllMocks();
    });
  });

  describe("When it's passed a req with a valid userand everything ok", () => {
    test("Then it should invoke res.status with code 201 and res.json with an empty object", async () => {
      const req = {
        body: {
          name,
          lastName,
          email,
          username,
          password,
        },
      };

      const createdUser = {
        ...req.body,
        id: "32434524563sad213342hjgf",
        save: jest.fn(),
      };

      const expectedCode = 201;
      const expectedJSON = {};

      User.create = jest.fn().mockResolvedValue(createdUser);
      User.findByIdAndDelete = jest.fn().mockResolvedValue();

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await register(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedJSON);
    });
  });
});
