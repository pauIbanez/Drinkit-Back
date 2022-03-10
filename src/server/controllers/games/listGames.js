const Game = require("../../../database/models/Game");

const listGames = async (req, res, next) => {
  try {
    const games = await Game.find();

    const gamesToSend = {
      games: [],
    };

    if (!games) {
      res.json(gamesToSend);
      return;
    }

    gamesToSend.games = games;
    res.json(gamesToSend);
  } catch (error) {
    next(error);
  }
};

module.exports = listGames;
