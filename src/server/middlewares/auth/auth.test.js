const jwt = require("jsonwebtoken");
const auth = require("./auth");

jest.mock("jsonwebtoken");

describe("Given auth", () => {
  describe("When it's passed a request without authorization header", () => {
    test("Then it should call next with an error with message 'No auth provided'", () => {
      const expectedError = {
        code: 401,
        send: "No auth provided",
      };
      const req = {
        header: () => {},
      };
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a request without a valid token", () => {
    test("Then it should call next with an error with message 'Invalid token'", () => {
      const expectedError = {
        code: 401,
        send: "Invalid token",
      };
      const req = {
        header: () => "Bearer invalidToken",
      };
      jwt.verify = jest.fn().mockImplementation(() => {
        throw new Error();
      });
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's passed a request without authorization headera valid token", () => {
    test("Then it should call next with an error with message 'Wrong token'", () => {
      const username = "usernaim";
      const id = "userId";

      const req = {
        header: () => "Bearer validToken",
      };

      jwt.verify = jest.fn().mockReturnValue({ username, id });
      const next = jest.fn();

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith();
      expect(req).toHaveProperty("user");
    });
  });
});
