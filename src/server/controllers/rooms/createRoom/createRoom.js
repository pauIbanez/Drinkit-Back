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
    const createdRoom = await Room.create(room);
    res.status(201).json(createdRoom);
  } catch (e) {
    next(e);
  }
};

module.exports = createRoom;
