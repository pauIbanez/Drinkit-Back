const jwt = require("jsonwebtoken");

const generateActivation = (id) => {
  const activationToken = jwt.sign(id, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = generateActivation;
