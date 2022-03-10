const { Joi } = require("express-validation");

Joi.objectId = Joi.string().alphanum().length(24);

const joiRoom = Joi.object({
  leader: Joi.objectId(),
  game: Joi.objectId(),
});

module.exports = joiRoom;
