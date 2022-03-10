const userValidator = require("./userValidator");

describe("Given userValidator", () => {
  describe("When instanciated passing a req with a valid user, a res and a next", () => {
    test("Then it should call next with nothing", () => {
      const req = {
        body: {
          name: "pablo",
          lastName: "sadaasd",
          email: "asdasdasdaa@dfsda.com",
          username: "asadadsf",
          password: "dasasdasdsa",
        },
      };
      const next = jest.fn();

      userValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When instanciated passing a req with a user with an invalid password, a res and a next", () => {
    test("Then it should call next with nothing", () => {
      const req = {
        body: {
          name: "pablo",
          lastName: "sadaasd",
          email: "asdasdasdaa@dfsda.com",
          username: "asadadsf",
          password: "s",
        },
      };
      const next = jest.fn();

      const expectedError = expect.objectContaining({
        code: 400,
        send: expect.stringContaining("password"),
      });

      userValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
