const generateUser = require("./generateUser");

describe("Given genrateUser", () => {
  describe("When it's invoked passing the user data", () => {
    test("Then it should return an object tith te data structured", () => {
      const name = "nein";
      const lastName = "lasname";
      const email = "imail";
      const username = "usernaim";
      const password = "passguord";

      const expectedUserData = {
        credentials: {
          username,
          password,
        },
        info: {
          name,
          lastName,
          email,
        },
        profile: {
          username,
        },
      };

      const reciuevedUserData = generateUser(
        name,
        lastName,
        email,
        username,
        password
      );

      expect(reciuevedUserData).toEqual(expectedUserData);
    });
  });
});
