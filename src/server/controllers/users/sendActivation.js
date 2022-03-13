const jwt = require("jsonwebtoken");
const User = require("../../../database/models/User");

const sendActivation = async (req, res, next) => {
  const { user } = req;

  try {
    const foundUser = await User.findById(user.id);

    const activationToken = jwt.sign(
      { id: foundUser.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2d",
      }
    );

    foundUser.activationToken = activationToken;
    foundUser.save();
  } catch (err) {
    const error = {
      send: "Activation email not send",
    };
    next(error);
  }
};

module.exports = sendActivation;
