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
      User.findById = jest
        .fn()
        .mockResolvedValue({ id: "userId", active: false });
      User.findByIdAndUpdate = jest.fn().mockResolvedValue();

      await activate(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe("When it's instanciated with a req with params with an invalid token", () => {
    test("Then it should call next with an error with code 400 and message 'Invalid activation token'", async () => {
      const req = {
        params: {
          activationToken: "invalid token",
        },
      };
      const next = jest.fn();

      const expectedError = {
        code: 400,
        send: "Invalid activation token",
      };

      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error("jwt malformed");
      });

      await activate(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's instanciated with a req with params but the user has already been activated", () => {
    test("Then it should call next with an error with code 400 and message 'This user is already activated'", async () => {
      const req = {
        params: {
          activationToken: "token",
        },
      };
      const next = jest.fn();

      const expectedError = {
        code: 400,
        send: "This user is already activated",
      };

      jwt.verify = jest.fn().mockReturnValue({ id: "userId" });
      User.findById = jest
        .fn()
        .mockResolvedValue({ id: "userId", active: true });

      await activate(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's instanciated with a req with params but the user does not exist", () => {
    test("Then it should call next with an error with code 404 and message 'User not found'", async () => {
      const req = {
        params: {
          activationToken: "token",
        },
      };
      const next = jest.fn();

      const expectedError = {
        code: 404,
        send: "User not found",
      };

      jwt.verify = jest.fn().mockReturnValue({ id: "userId" });
      User.findById = jest.fn().mockResolvedValue(null);

      await activate(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
