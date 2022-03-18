const jwt = require("jsonwebtoken");

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
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = {
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
