const { Joi } = require("express-validation");

const JoiLoginUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = JoiLoginUser;
