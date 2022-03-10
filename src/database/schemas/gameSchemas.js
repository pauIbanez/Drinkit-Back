const { Schema } = require("mongoose");

const gameInfo = new Schema({
  setup: {
    type: String,
    required: true,
  },
  howToPlay: {
    type: String,
    required: true,
  },
});

export default gameInfo;
