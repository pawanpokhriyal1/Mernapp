import app from "./app.js";
import { connectDB } from "./config/dataBase.js";
import cloudinary from "cloudinary"

connectDB();

cloudinary.v2.config({
    cloud_name: "dnt8u58hr",
    api_key: "765553479561952",
    api_secret: "z_TEGI8MWU3Cx4vFepMXopbCtqA",
});
app.listen(process.env.PORT, () => {
    console.log(`Server is working on port :${process.env.PORT}`)
})