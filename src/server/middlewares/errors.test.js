const { notFoundError, errorHandler } = require("./errors");

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

describe("Given errorHandler", () => {
  describe("When it's invoked passing an unkown error", () => {
    test("Then it should call res.status with a 500 and res.json with the message 'Internal server error'", () => {
      const error = new Error("Some random error");
      const expectedError = {
        error: true,
        code: 500,
        message: "Internal server error",
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const expectedCode = 500;

      errorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's invoked passing a known error with message 'test error' and code 400", () => {
    test("Then it should call res.status with a 400 and res.json with the message 'test error'", () => {
      const error = {
        code: 400,
        send: "test error",
      };

      const expectedError = {
        error: true,
        code: 400,
        message: "test error",
      };

      const expectedCode = 400;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      errorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
