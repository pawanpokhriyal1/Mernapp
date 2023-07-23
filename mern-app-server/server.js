import app from "./app.js";
import { connectDB } from "./config/dataBase.js";
import cloudinary from "cloudinary"
import { config } from "dotenv"
import Razorpay from "razorpay"
config({
    path: "./config/config.env"
})
connectDB();

cloudinary.v2.config({
    cloud_name: "dnt8u58hr",
    api_key: "765553479561952",
    api_secret: "z_TEGI8MWU3Cx4vFepMXopbCtqA",
});

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY || "rzp_test_sRSZKEBbRuil7a",
    key_secret: process.env.RAZORPAY_API_SECRET || "pTTEfOK0I2G6weGN8VCfNxmE",
});
app.listen(process.env.PORT, () => {
    console.log(`Server is working on port :${process.env.PORT}`)
})