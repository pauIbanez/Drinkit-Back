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
});
