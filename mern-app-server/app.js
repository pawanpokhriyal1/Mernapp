import express from "express"
import { config } from "dotenv"
import { ErrorMiddleWare } from "./middlewares/Error.js"

config({
    path: "./config/config.env"
})
const app = express()
// Using MiddleWare
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

// Importing and using Routes
import courses from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
app.use("/api/v1", courses);
app.use("/api/v1", user)


export default app

app.use(ErrorMiddleWare)