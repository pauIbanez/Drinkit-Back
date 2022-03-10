/* roomData
leader: id,
game: id,
*/

const Room = require("../../../../database/models/Room");

const createRoom = async (req, res, next) => {
  const roomData = req.body;

  const room = {
    players: [],
    game: roomData.game,
    leader: roomData.leader,
  };

  try {
    await Room.create(room);
    res.status(201).json({});
  } catch (e) {
    next(e);
  }
};

module.exports = createRoom;
