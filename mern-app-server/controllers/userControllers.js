import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return next(new ErrorHandler("Plaese enter all fields", 400));


    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 409));

    //upload file on cloudinary;
    user = await User.create({
        name, email, password, avatar: {
            Public_id: "tempid",
            url: "tempurl",
        },
    })
    sendToken(res, user, "Register Successfully", 201)
})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorHandler("Plaese enter all fields", 400));


    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Password", 401));
    sendToken(res, user, "login Successfully", 201)
})

export const logout = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        HttpOnly: true,
        // secure: true,
        sameSite: "none",
    }).json({
        success: true,
        message: "Logged Out Sccessfully"
    });
})

export const getMyProfile
    = catchAsyncError(async (req, res, next) => {
        const user = await User.findById(req.user._id)

        res.status(200).json({
            success: true,
            user
        })
    })