const User = require("../../../../database/models/User");

const sendData = async (req, res, next) => {
  const { user } = req;

  const error = {
    code: 404,
    send: "User not found",
  };
  const userData = await User.findById(user.id);
  if (!userData) {
    next(error);
    return;
  }
  res.json(userData);
};

module.exports = sendData;
