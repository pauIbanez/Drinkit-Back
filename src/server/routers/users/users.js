const express = require("express");
const register = require("../../controllers/users/register/register");
const sendActivation = require("../../controllers/users/sendActivation/sendActivation");

const userValidator = require("../../middlewares/joiValidators/userValidator/userValidator");

const router = express.Router();

router.post("/register", userValidator, register, sendActivation);

module.exports = router;
