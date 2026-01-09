import express, { application } from "express"
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))