const express = require("express");
const createRoom = require("../../controllers/rooms/createRoom/createRoom");
const deleteRoom = require("../../controllers/rooms/deleteRoom/deleteRoom");
const listRooms = require("../../controllers/rooms/listRooms/listRooms");
const roomValidator = require("../../middlewares/joiValidators/roomValidator/roomValidator");
const placeholder = require("../../middlewares/placeholder/placeholder");

const router = express.Router();

router.get("/list", listRooms);
router.post("/create", roomValidator, createRoom);
router.delete("/delete", placeholder, deleteRoom);

module.exports = router;
