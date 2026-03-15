// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         lowercase: true 
//     },
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     password: { 
//         type: String, 
//         required: true 
//     }, // You'll hash this later
//     avatar: { 
//         type: String 
//     }, // Profile pic URL
//     refreshToken: { 
//         type: String 
//     }
// }, { timestamps: true });

// export const User = mongoose.model("User", userSchema);


import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
    },

    nickName: {
      type: String,
    },

    dob: {
      type: Date,
    },

    address: {
      type: String,
    },

    contactNum: {
      type: String,
    },

    avatar: {
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

    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

// Hash password before saving (Mongoose 9: async hooks don't use next())
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

const User = mongoose.model("User", userSchema);
export default User;
