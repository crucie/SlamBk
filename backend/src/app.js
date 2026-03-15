import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import slambookRoutes from "./routes/slam.routes.js"
import entryRoutes from "./routes/entry.routes.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))

app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.json({limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/slambooks", slambookRoutes)
app.use("/api/v1/entries", entryRoutes)

// Health check
app.get("/", (req, res) => {
    res.json({ 
        message: "SlamBk Server Running 🚀",
        cors_origin: process.env.CORS_ORIGIN || "NOT SET" 
    })
})

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});

export default app
