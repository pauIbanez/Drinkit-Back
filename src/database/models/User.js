const { model, Schema, SchemaTypes } = require("mongoose");
const {
  userInfo,
  userCredentials,
  userProfile,
} = require("../schemas/userSchemas");

const UserSchema = new Schema({
  info: {
    type: userInfo,
    required: true,
  },
  credentials: {
    type: userCredentials,
    required: true,
  },

  profile: {
    type: userProfile,
    required: true,
  },

  active: {
    type: Boolean,
    default: false,
  },

  activationToken: {
    type: String,
  },
  online: {
    type: Boolean,
    default: false,
  },
  inRoom: {
    type: Boolean,
    default: false,
  },
  room: {
    type: SchemaTypes.ObjectId,
    ref: "Room",
  },
});

const User = model("User", UserSchema, "users");

module.exports = User;
