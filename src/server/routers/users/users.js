const express = require("express");
const activate = require("../../controllers/users/activate/activate");
const register = require("../../controllers/users/register/register");
const sendActivation = require("../../controllers/users/sendActivation/sendActivation");

const userValidator = require("../../middlewares/joiValidators/userValidator/userValidator");

const router = express.Router();

router.get("/activate/:activationToken", activate);
router.post("/register", userValidator, register, sendActivation);

module.exports = router;
