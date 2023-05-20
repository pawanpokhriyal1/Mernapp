import express from "express"
import { config } from "dotenv"
config({
    path: "./config/config.env"
})
const app = express()

// Importing and using Routes
import courses from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
app.use("/api/v1", courses);
app.use("/api/v1", user)


export default app