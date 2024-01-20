const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
    pronouns: {
      type: String,
    },
    region: {
      type: String,
    },
    headerURL: {
      type: String,
    },
    cellNumber: {
      type: String,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
