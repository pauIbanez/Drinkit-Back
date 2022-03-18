const User = require("../../../../database/models/User");
const sendData = require("./sendData");

describe("Given sendData", () => {
  describe("When it's instanciated passing a req with a user and evertything goes ok", () => {
    test("Then it should call res.json with the recieved user", async () => {
      const req = {
        user: {
          id: "userId",
        },
      };

      const res = {
        json: jest.fn(),
      };

      const userData = {
        info: {
          avatar: {
            staticURL: "https://a",
          },
        },
        profile: {
          username: "username",
        },
      };

      User.findById = jest.fn().mockResolvedValue(userData);

      await sendData(req, res);

      expect(res.json).toHaveBeenCalledWith(userData);
    });
  });
});
