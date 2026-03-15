import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 3000;

connectDB()
.then( () => {
    app.listen(PORT, () => {
        console.log(`Listening to PORT ${PORT}, hehe`)
    });
})
.catch((err) => {
  console.log("MongoDb Conection Failed ! ! ! ", err)
})
