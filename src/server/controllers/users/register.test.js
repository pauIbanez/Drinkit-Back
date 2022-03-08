const register = require("./register");

describe("Given register controller", () => {
  describe("When it's passed a req with invalid user data and a next", () => {
    test("Then it should invoke next with the error 'Invalid user data' and the code 400", async () => {
      const name = "sadasd";
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
});
