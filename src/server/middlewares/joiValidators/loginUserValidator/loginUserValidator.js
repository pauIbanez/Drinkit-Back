const JoiLoginUser = require("../../../joiSchemas/loginSchema");

const loginUserValidator = (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = JoiLoginUser.validate(req.body, options);

  if (error) {
    error.code = 400;

    error.send = "Invalid user data";
    next(error);
    return;
  }

  req.body = value;
  next();
};

module.exports = loginUserValidator;
