import express, { application, urlencoded } from "express"
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({extended: true, limits: "16kb"})); // for encoding a URL 
app.use(express.json({"limit:16kb"}));
app.use(express.static("public"));
app.use(cookieparser());


