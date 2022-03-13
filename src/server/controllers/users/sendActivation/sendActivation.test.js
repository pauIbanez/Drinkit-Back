const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../../../../database/models/User");
const sendActivation = require("./sendActivation");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((a, cb) => {
      cb();
    }),
  }),
}));

describe("Given sendActivation", () => {
  describe("When it's instanciated passing a req with a user and everything goes ok", () => {
    test("Then it should call the founduser.save function", async () => {
      const foundUser = {
        profile: {
          username: "username",
        },
        info: {
          name: "user name",
          email: "someemail@aaaaa.com",
        },
        save: jest.fn(),
      };

      const req = {
        user: {
          id: "userid",
        },
      };

      const next = jest.fn();

      const transporter = {
        sendMail: jest.fn().mockImplementation((mailData, cb) => {
          cb();
        }),
      };

      nodemailer.createTransport = jest.fn().mockReturnValue(transporter);

      User.findById = jest.fn().mockResolvedValue(foundUser);
      jwt.sign = jest.fn().mockReturnValue("token");

      await sendActivation(req, null, next);

      expect(foundUser.save).toHaveBeenCalled();
      expect(foundUser.activationToken).toBe("token");
      expect(next).not.toHaveBeenCalled();
    });
  });
});
