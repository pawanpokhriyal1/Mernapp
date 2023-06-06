import mongoose from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken"
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be atleast 6 character"],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    subscription: {
        id: String,
        status: String,
    },
    avatar: {
        Public_id: { type: String, required: true },
        url: {
            type: String,
            required: true,
        }
    },
    playList: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
            poster: String,

        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ResetPasswordToken: String,
    ResetPasswordExpire: String,

});
schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })
}
export const User = mongoose.model("User", schema);