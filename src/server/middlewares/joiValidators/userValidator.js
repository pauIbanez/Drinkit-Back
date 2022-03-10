const joiUser = require("../../joiSchemas/userSchema");

const userValidator = (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = joiUser.validate(req.body, options);

  if (error) {
    error.code = 400;

    error.send = error.details.map((detail) => detail.message).join(", ");
    next(error);
    return;
  }

  req.body = value;
  next();
};

module.exports = userValidator;
