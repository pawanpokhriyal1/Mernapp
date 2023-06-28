import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary"

export const getAllCourse = catchAsyncError(async (req, res, next) => {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        success: true,
        courses,
    });
})

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy)
        return next(new ErrorHandler("Please add all fields", 400));
    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            Public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }

    })
    res.status(201).json({
        success: true,
        message: "Course Created successfully.You can add lectures ",
    });
})

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id)
    if (!course) return next(new ErrorHandler("Course not Found", 404));

    course.views += 1;
    await course.save();
    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
})

export const addCourseLectures = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    //const file=re.file

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not Found", 404));
    // upload file here

    course.lectures.push({
        title, description, video: { public_id: "url", url: "url" }
    })

    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        lectures: "lecture added",
    });
})