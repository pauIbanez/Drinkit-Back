const { notFoundError } = require("./errors");

describe("Given notFoundError", () => {
  describe("When it's invoked", () => {
    test("Then it should call res.status with 404 and res.json with the message 'Resouce not found'", () => {
      const expectedMessage = {
        error: true,
        message: "Resouce not found",
      };
      const expectedCode = 404;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });
});
