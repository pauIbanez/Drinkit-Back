const { Schema, SchemaTypes } = require("mongoose");

const defaultAvatar = "6227721d77140f9893aad259";

const userInfo = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: SchemaTypes.ObjectId,
    ref: "Avatar",
    default: defaultAvatar,
  },
});

const userCredentials = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

const userStats = new Schema({
  sips: {
    type: Number,
    default: 0,
  },
  games: {
    type: Number,
    default: 0,
  },
});

const userProfile = new Schema({
  username: {
    type: String,
    required: true,
  },
  friends: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
  },
  incomingRequests: {
    type: [SchemaTypes.ObjectId],
    ref: "User",
  },
  stats: {
    type: userStats,
    required: true,
  },
});

module.exports = { userInfo, userCredentials, userProfile };
