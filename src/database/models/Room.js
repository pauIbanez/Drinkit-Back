const { model, Schema, SchemaTypes } = require("mongoose");

const RoomSchema = new Schema(
  {
    players: {
      type: [SchemaTypes.ObjectId],
      required: true,
    },
    game: {
      type: SchemaTypes.ObjectId,
      ref: "Game",
      required: true,
    },
    inGame: {
      type: Boolean,
      default: false,
    },
    inLobby: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    leader: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = model("Room", RoomSchema, "rooms");

module.exports = Room;
