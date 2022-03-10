const { model, Schema } = require("mongoose");
const { default: gameInfo } = require("../schemas/gameSchemas");

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gameInfo: {
    type: gameInfo,
    required: true,
  },
  drunkness: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  minPlayers: {
    type: Number,
    required: true,
  },
  maxPlayers: {
    type: Number,
    required: true,
  },
});

const Game = model("Game", GameSchema, "games");

module.exports = Game;
