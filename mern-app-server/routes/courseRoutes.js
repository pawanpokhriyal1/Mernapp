import express from "express"
import { addCourseLectures, createCourse, getAllCourse, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
//Get All courses without Lectures
router.route("/courses").get(getAllCourse)
// Create new Course -only admin
router.route("/createcourse").post(singleUpload, createCourse)

//Add Lecture ,Delete lecture ,Get Course Details

//Get Lectures of particular course
router.route("/course/:id").get(getCourseLectures)

//Add Lectures to particular Course
router.route("/course/:id").post(singleUpload, addCourseLectures)

// Delete lectures
export default router;