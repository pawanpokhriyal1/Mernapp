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


    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

    const isMatch = await User.comparePassword();
    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Password", 401));
    sendToken(res, user, "Register Successfully", 201)
})