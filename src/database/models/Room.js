const { model, Schema, SchemaTypes } = require("mongoose");

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
  },
});

const Room = model("Room", RoomSchema, "rooms");

module.exports = Room;
