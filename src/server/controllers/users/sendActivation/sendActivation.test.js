const jwt = require("jsonwebtoken");

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

      User.findById = jest.fn().mockResolvedValue(foundUser);
      jwt.sign = jest.fn().mockReturnValue("token");

      await sendActivation(req, null, next);

      expect(foundUser.save).toHaveBeenCalled();
      expect(foundUser.activationToken).toBe("token");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("When it's instanciated passing a req with a user and something breaks wile ", () => {
    test("Then it should call the foundById and delete method of the user and not call founduser.save", async () => {
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
          isRegister: true,
        },
      };

      User.findById = jest.fn().mockResolvedValue(foundUser);
      User.findByIdAndDelete = jest.fn().mockResolvedValue();
      jwt.sign = jest.fn().mockImplementation(() => {
        throw new Error("some error");
      });

      await sendActivation(req);

      expect(foundUser.save).not.toHaveBeenCalled();
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(req.user.id);
    });
  });
});
