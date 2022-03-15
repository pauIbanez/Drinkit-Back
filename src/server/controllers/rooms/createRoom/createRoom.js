/* roomData
leader: id,
game: id,
*/

const Room = require("../../../../database/models/Room");

const createRoom = async (req, res, next) => {
  const roomData = req.body;
  const { user } = req;

  const room = {
    players: [],
    game: roomData.game,
    leader: user.id,
  };

  try {
    const { id } = await Room.create(room);
    const createdRoom = await Room.findById(id).populate("leader game");
    res.status(201).json(createdRoom);
  } catch (e) {
    next(e);
  }
};

module.exports = createRoom;
