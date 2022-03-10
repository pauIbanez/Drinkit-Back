const Room = require("../../../../database/models/Room");

const listRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("game leader");

    const roomsToSend = {
      rooms: [],
    };

    if (!rooms) {
      res.json(roomsToSend);
      return;
    }

    roomsToSend.rooms = rooms;
    res.json(roomsToSend);
  } catch (error) {
    next(error);
  }
};

module.exports = listRooms;
