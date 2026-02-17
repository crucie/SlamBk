import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }, // You'll hash this later
    avatar: { 
        type: String 
    }, // Profile pic URL
    refreshToken: { 
        type: String 
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },

//     nickName: {
//       type: String,
//       required: false,
//     },

//     dob: {
//       type: Date,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     contactNum: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//     },

//     favoriteColor: {
//       type: String,
//     },

//     favoriteMovie: {
//       type: String,
//     },

//     favoriteSong: {
//       type: String,
//     },

//     bestMemoryWithMe: {
//       type: String,
//     },

//     oneWordForMe: {
//       type: String,
//     },

//     adviceForMe: {
//       type: String,
//     },

//     crushName: {
//       type: String,
//     },
//   },

//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;
