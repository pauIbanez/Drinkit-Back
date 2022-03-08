const bcrypt = require("bcrypt");
const generateActivation = require("../../../utils/activation");

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

  const user = {
    name,
    lastName,
    email,
    username,
    password: hashedPassword,
  };

  try {
    const createdUser = await User.create(user);

    generateActivation(createdUser.id);

    res.status(201).json({});
  } catch (e) {
    next(e);
  }
};

module.exports = register;
