const express = require("express");
const listRooms = require("../../controllers/rooms/listRooms");

const router = express.Router();

router.get("/list", listRooms);

module.exports = router;
