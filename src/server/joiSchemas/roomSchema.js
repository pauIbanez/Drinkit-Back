const { Joi } = require("express-validation");

const joiRoom = Joi.object({
  leader: Joi.string().alphanum().length(24),
  game: Joi.string().alphanum().length(24),
});

module.exports = joiRoom;
