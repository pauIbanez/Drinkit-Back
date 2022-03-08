const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../../database/models/User");
const generateUser = require("../../../utils/users/creation/generateUser");

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
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = generateUser(name, lastName, email, username, hashedPassword);

  try {
    const createdUser = await User.create(user);

    try {
      const activationToken = jwt.sign(
        createdUser.id,
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      createdUser.activationToken = activationToken;
      createdUser.save();
    } catch (err) {
      await User.findByIdAndDelete(createdUser.id);
      next(err);
    }
    res.status(201).json({});
  } catch (e) {
    next(e);
  }
};

module.exports = register;
