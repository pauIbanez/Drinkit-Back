const jwt = require("jsonwebtoken");
const User = require("../../../../database/models/User");

const secret = process.env.TOKEN_SECRET;

const activate = async (req, res, next) => {
  const { activationToken } = req.params;

  const object = jwt.verify(activationToken, secret);
  console.log(object);

  // if (!valid) {
  //   const error = {
  //     code: 403,
  //     send: "Invalid activation token",
  //   };
  //   next(error);
  //   return;
  // }

  // await User.findByIdAndUpdate(userId);

  res.json({});
};

module.exports = activate;
