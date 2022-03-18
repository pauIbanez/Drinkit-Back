const { Schema, SchemaTypes } = require("mongoose");

const defaultAvatar = "6227721d77140f9893aad259";
const defaultAvatarBackup = "backupUrl";

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
    unique: true,
  },
});

const userCredentials = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
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

const defaultStats = {
  sips: 0,
  games: 0,
};

const avatarSchema = new Schema({
  staticUrl: {
    type: String,
    default: defaultAvatar,
  },
  backup: {
    type: String,
    default: defaultAvatarBackup,
  },
});

const defaultAvatarValues = {
  staticUrl: defaultAvatar,
  backup: defaultAvatarBackup,
};

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
    default: defaultStats,
  },
  avatar: {
    type: avatarSchema,
    default: defaultAvatarValues,
  },
});

module.exports = { userInfo, userCredentials, userProfile };
