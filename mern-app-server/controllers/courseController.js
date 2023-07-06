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

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: "video",
    });

    course.lectures.push({
        title, description, video: { Public_id: mycloud.public_id, url: mycloud.secure_url }
    })

    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        lectures: "lecture added",
    });
})


export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404))
    await cloudinary.v2.uploader.destroy(course.poster.Public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(singleLecture.video.Public_id, {
            resource_type: "video"
        })
    }
    await course.deleteOne();
    res.status(200).json({
        success: true,
        message: "Course Deleted successfully.",
    });
})



export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;

    const course = await Course.findById(courseId);

    if (!course) return next(new ErrorHandler("Course not found", 404))


    const lecture = course.lectures.filter(item => {
        if (item._id.toString() === lectureId.toString()) return item;
    })
    console.info(lecture);
    await cloudinary.v2.uploader.destroy(lecture[0]._id, {
        resource_type: "video"
    })
    course.lectures = course.lectures.filter(item => {
        if (item._id.toString() !== lectureId.toString()) return item;
    })
    course.numOfVideos = course.lectures.length;
    await course.save();
    res.status(200).json({
        success: true,
        message: "Lecture Deleted successfully.",
    });
})