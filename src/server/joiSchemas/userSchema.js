const { Joi } = require("express-validation");

const joiUser = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  lastName: Joi.string().min(2).max(10).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(2).max(10).alphanum().required(),
  password: Joi.string().min(8).required(),
});

module.exports = joiUser;
