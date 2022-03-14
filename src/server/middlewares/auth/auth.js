const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

const auth = (req, res, next) => {
  const headerAuth = req.header("Authorization");
  if (!headerAuth) {
    const error = {
      code: 401,
      send: "No auth provided",
    };
    next(error);
    return;
  }
  const token = headerAuth.replace("Bearer ", "");
  try {
    const { username, id } = jwt.verify(token, secret);
    req.user = {
      username,
      id,
    };
    next();
  } catch (e) {
    const error = {
      code: 401,
      send: "Invalid token",
    };
    next(error);
  }
};

module.exports = auth;
