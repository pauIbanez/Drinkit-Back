const Room = require("../../../database/models/Room");

const validateCreate = async (req, res, next) => {
  const { user } = req;

  const foundRoom = Room.findOne({ leader: user.id });

  if (foundRoom) {
    const error = {
      code: 403,
      send: `Room already active for this player: ${foundRoom.id}`,
    };
    next(error);
    return;
  }
  next();
};

module.exports = validateCreate;
