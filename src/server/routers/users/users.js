const express = require("express");
const register = require("../../controllers/users/register");

const router = express.Router();

router.get("/register", register);

module.exports = router;
