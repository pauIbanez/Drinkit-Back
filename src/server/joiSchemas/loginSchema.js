const { Joi } = require("express-validation");

const loginUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = loginUser;
