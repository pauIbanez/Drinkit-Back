const Room = require("../../../database/models/Room");

const listRooms = async (req, res, next) => {
  try {
    const rooms = Room.find({
      $where: {
        isActive: true,
      },
    });

    const roomsToSend = {
      rooms: [],
    };
    if (!rooms) {
      res.json(roomsToSend);
    }

    roomsToSend.rooms = rooms;
    res.json(roomsToSend);
  } catch (e) {
    next(e);
  }
};

module.exports = listRooms;
