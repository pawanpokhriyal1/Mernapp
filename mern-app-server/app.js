import express from "express"
import { config } from "dotenv"
import { ErrorMiddleWare } from "./middlewares/Error.js"
import cookieParser from "cookie-parser"
config({
    path: "./config/config.env"
})
const app = express()
// Using MiddleWare
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.use(cookieParser());

// Importing and using Routes
import courses from "./routes/courseRoutes.js"
import user from "./routes/userRoutes.js"
import cloudinary from "cloudinary"

app.use("/api/v1", courses);
app.use("/api/v1", user)


export default app
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
app.use(ErrorMiddleWare)