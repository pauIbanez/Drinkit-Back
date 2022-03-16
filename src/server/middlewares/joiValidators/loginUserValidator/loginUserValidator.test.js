const loginUserValidator = require("./loginUserValidator");

describe("Given userValidator", () => {
  describe("When instanciated passing a req with a valid user, a res and a next", () => {
    test("Then it should call next with nothing", () => {
      const req = {
        body: {
          username: "asadadsf",
          password: "dasasdasdsa",
        },
      };
      const next = jest.fn();

      loginUserValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When instanciated passing a req with a user without password, a res and a next", () => {
    test("Then it should call next with an error with code 400 and message 'Invalid user data'", () => {
      const req = {
        body: {
          username: "asadadsf",
        },
      };
      const next = jest.fn();

      const expectedError = expect.objectContaining({
        code: 400,
        send: "Invalid user data",
      });

      loginUserValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
