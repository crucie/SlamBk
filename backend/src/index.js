import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/slam.routes.js"
import User from "./models/user.models.js";
import connectDB from "./db/index.js";


dotenv.config({
    path: './.env'
})


connectDB()
.then( () => {
    app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}, hehe`)
    });
})
.catch((err) => {
  console.log("MongoDb Conection Failed ! ! ! ", err)
})

// const app = express();

// dotenv.config();

// const DB_NAME = process.env.DB_NAME || "userData";
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));



// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello from server HEHE index.js")
// })

// app.get("/api/Users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post("api/users", async (req, res) => {
//   try {
//    const { id } = req.params;
//    const user = await User.findById(id);
//    res.status(200).json(user); 
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

// mongoose
//   .connect(`${MONGODB_URI}/${DB_NAME}`)
//   .then(() => {
//     console.log("Connected To MongoDB");
//   })
//   .catch((error) => {
//     console.log("Connection Failed");
//     console.log(error);
//   });
