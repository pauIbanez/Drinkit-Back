const express = require("express");

const register = require("../../controllers/users/register");
const userValidator = require("../../middlewares/joiValidators/userValidator");

const router = express.Router();

router.post("/register", userValidator, register);

module.exports = router;
