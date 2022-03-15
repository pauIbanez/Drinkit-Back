const { Joi } = require("express-validation");

const joiRoom = Joi.object({
  game: Joi.string().alphanum().length(24),
});

module.exports = joiRoom;
