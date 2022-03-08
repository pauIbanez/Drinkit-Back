const User = require("../../../database/models/User");
const register = require("./register");

describe("Given register controller", () => {
  const name = "nein";
  const lastName = "lasname";
  const email = "imail";
  const username = "usernaim";
  const password = "passguord";

  describe("When it's passed a req with invalid user data and a next", () => {
    test("Then it should invoke next with the error 'Invalid user data' and the code 400", async () => {
      const req = {
        body: {
          name,
        },
      };

      const expectedError = {
        code: 400,
        send: "Invalid user data",
      };

      const next = jest.fn();

      await register(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

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
});
