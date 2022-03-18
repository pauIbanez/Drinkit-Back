const express = require("express");
const createRoom = require("../../controllers/rooms/createRoom/createRoom");
const deleteRoom = require("../../controllers/rooms/deleteRoom/deleteRoom");
const listRooms = require("../../controllers/rooms/listRooms/listRooms");
const auth = require("../../middlewares/auth/auth");
const roomValidator = require("../../middlewares/joiValidators/roomValidator/roomValidator");
const validateCreate = require("../../middlewares/validateCreate/validateCreate");

const router = express.Router();

router.get("/list", listRooms);
router.post("/create", auth, roomValidator, validateCreate, createRoom);
router.delete("/delete", auth, deleteRoom);

module.exports = router;
