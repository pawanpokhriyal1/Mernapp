import mongoose from "mongoose";

export const connectDB = async () => {
    const connection = await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log(`MongoDB connected with LocalHost`);
        })
        .catch((err) => {
            console.log("Not Connected to Database ERROR! ", err);
        });
};
