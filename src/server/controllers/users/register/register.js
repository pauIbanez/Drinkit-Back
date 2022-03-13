const bcrypt = require("bcrypt");

const User = require("../../../../database/models/User");
const generateUser = require("../../../../utils/users/creation/generateUser");

const register = async (req, res, next) => {
  const { name, lastName, email, username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = generateUser(name, lastName, email, username, hashedPassword);

  try {
    const createdUser = await User.create(user);

    req.user = createdUser;

    res.status(201).json({});
  } catch (e) {
    const invalidUser = {
      code: 409,
      send: e.message.includes("username") ? "username" : "email",
    };
    next(invalidUser);
  }
};

module.exports = register;
