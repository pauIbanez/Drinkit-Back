const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../../../database/models/User");

const login = async (req, res, next) => {
  const user = req.body;

  const error = {
    code: 401,
    send: "Incorrect username or password",
  };

  const userExists = await User.findOne({
    $or: [
      { "credentials.username": user.username },
      { "info.email": user.username },
    ],
  });

  if (!userExists) {
    next(error);
    return;
  }

  const valid = await bcrypt.compare(
    user.password,
    userExists.credentials.password
  );

  if (!valid) {
    next(error);
    return;
  }
  const tokenData = {
    id: userExists.id,
  };

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

  res.json({ token });
};

module.exports = login;
