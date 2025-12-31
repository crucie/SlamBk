import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    nickName: {
      type: String,
      required: false,
    },

    dob: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    contactNum: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    favoriteColor: {
      type: String,
    },

    favoriteMovie: {
      type: String,
    },

    favoriteSong: {
      type: String,
    },

    bestMemoryWithMe: {
      type: String,
    },

    oneWordForMe: {
      type: String,
    },

    adviceForMe: {
      type: String,
    },

    crushName: {
      type: String,
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
