const express = require("express");
const activate = require("../../controllers/users/activate/activate");
const login = require("../../controllers/users/login/login");
const register = require("../../controllers/users/register/register");
const sendActivation = require("../../controllers/users/sendActivation/sendActivation");
const loginUserValidator = require("../../middlewares/joiValidators/loginUserValidator/loginUserValidator");

const userValidator = require("../../middlewares/joiValidators/userValidator/userValidator");

const router = express.Router();

router.get("/activate/:activationToken", activate);
router.post("/register", userValidator, register, sendActivation);
router.post("/login", loginUserValidator, login);

module.exports = router;
