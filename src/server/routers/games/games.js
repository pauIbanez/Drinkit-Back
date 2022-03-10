const express = require("express");
const listGames = require("../../controllers/games/listGames");

const router = express.Router();

router.get("/list", listGames);

module.exports = router;
