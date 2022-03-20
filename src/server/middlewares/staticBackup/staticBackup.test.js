const fs = require("fs");
const User = require("../../../database/models/User");
const staticBackup = require("./staticBackup");

jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(),
  ref: jest.fn().mockReturnValue("avatarRef"),
  getBytes: jest.fn().mockResolvedValue("buffer"),
}));

describe("Given staticBackup", () => {
  describe("When it's instanciated with a req with an existing avatar", () => {
    test("Then it should call res.sendFile", async () => {
      const req = {
        params: {
          avatar: "avatar.png",
        },
      };

      const res = {
        sendFile: jest.fn(),
      };

      const user = {
        profile: {
          avatar: {
            staticUrl: "avatar.png",
            backup: "somebackup",
          },
        },
      };

      Buffer.from = jest.fn().mockReturnValue("avatarBuffer");
      User.findOne = jest.fn().mockResolvedValue(user);
      fs.appendFile = jest.fn().mockImplementation((path, buffer, callback) => {
        callback();
      });

      await staticBackup(req, res);

      expect(res.sendFile).toHaveBeenCalled();
    });
  });

  describe("When it's instanciated with a req with an existing avatar but writing failed", () => {
    test("Then it should call next with code 404 and message not found", async () => {
      const req = {
        params: {
          avatar: "avatar.png",
        },
      };

      const expectedError = {
        code: 404,
        send: "Not found",
      };

      const next = jest.fn();

      const user = {
        profile: {
          avatar: {
            staticUrl: "avatar.png",
            backup: "somebackup",
          },
        },
      };

      Buffer.from = jest.fn().mockReturnValue("avatarBuffer");
      User.findOne = jest.fn().mockResolvedValue(user);
      fs.appendFile = jest.fn().mockImplementation((path, buffer, callback) => {
        callback("something");
      });

      await staticBackup(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
