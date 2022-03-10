const roomValidator = require("./roomValidator");

describe("Given roomValidator", () => {
  describe("When it's called passing a correct room", () => {
    test("Then it should call next with nothing", () => {
      const next = jest.fn();
      const req = {
        body: {
          leader: "622a0b309b056758689f06e9",
          game: "622a0b309b056758689f06e9",
        },
      };

      roomValidator(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it's called passing a room with incorrect leader", () => {
    test("Then it should call next with an error containing leader and code 400", () => {
      const next = jest.fn();
      const req = {
        body: {
          leader: "invalid id",
          game: "622a0b309b056758689f06e9",
        },
      };

      const expectedError = expect.objectContaining({
        code: 400,
        send: expect.stringContaining("leader"),
      });

      roomValidator(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
