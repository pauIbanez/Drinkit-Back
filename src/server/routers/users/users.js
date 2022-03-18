const express = require("express");
const activate = require("../../controllers/users/activate/activate");
const login = require("../../controllers/users/login/login");
const register = require("../../controllers/users/register/register");
const sendActivation = require("../../controllers/users/sendActivation/sendActivation");
const sendData = require("../../controllers/users/sendData/sendData");
const auth = require("../../middlewares/auth/auth");
const loginUserValidator = require("../../middlewares/joiValidators/loginUserValidator/loginUserValidator");

const userValidator = require("../../middlewares/joiValidators/userValidator/userValidator");

const router = express.Router();

router.get("/activate/:activationToken", activate);
router.post("/register", userValidator, register, sendActivation);
router.post("/login", loginUserValidator, login);
router.get("/my-account", auth, sendData);

module.exports = router;
