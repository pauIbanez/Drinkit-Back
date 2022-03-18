const User = require("../../../../database/models/User");

const sendData = async (req, res, next) => {
  const { user } = req;

  const error = {
    code: 404,
    send: "User not found",
  };

  try {
    const userData = await User.findById(user.id).populate("info.avatar");
    if (!userData) {
      next(error);
      return;
    }
    res.json(userData);
  } catch (e) {
    next(error);
  }
};

module.exports = sendData;
