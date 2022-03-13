const Room = require("../../../../database/models/Room");

const deleteRoom = async (req, res, next) => {
  // const { user } = req;
  const user = {
    id: "62277a27672a087b0639ba76",
  };

  const playerRoom = await Room.findOne({ leader: user.id });

  if (!playerRoom) {
    const error = {
      code: 404,
      send: "No rooms found",
    };
    next(error);
    return;
  }

  try {
    await Room.findByIdAndDelete(playerRoom.id);
    res.json({});
  } catch (error) {
    next(error);
  }
};

module.exports = deleteRoom;
