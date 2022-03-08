const { getActivationEmail } = require("./mailData");

describe("Given mailData", () => {
  describe("When it's passed an activation token", () => {
    test("Then the returned email should contain the activation link", () => {
      const activationToken =
        "saddbnjhasgfrdesougidshknjfdsagfde89670fdsa5678342r789r8t23gr2";
      const expectedText = expect.stringContaining(activationToken);

      const recievedEmail = getActivationEmail("", "", activationToken);

      expect(recievedEmail).toEqual(expectedText);
    });
  });
});
