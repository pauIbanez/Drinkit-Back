const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { name, lastName, email, username, password } = req.body;

  if (!name || !lastName || !email || !username || !password) {
    const invalidDataError = {
      code: 400,
      send: "Invalid user data",
    };

    next(invalidDataError);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
};

module.exports = register;
