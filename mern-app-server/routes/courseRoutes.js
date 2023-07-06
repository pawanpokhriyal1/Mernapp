import express from "express"
import { addCourseLectures, createCourse, deleteCourse, deleteLecture, getAllCourse, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
//Get All courses without Lectures
router.route("/courses").get(getAllCourse)
// Create new Course -only admin
router.route("/createcourse").post(isAuthenticated, authorizedAdmin, singleUpload, createCourse)

//Add Lecture ,Delete lecture ,Get Course Details

//Get Lectures of particular course
router.route("/course/:id").get(isAuthenticated, getCourseLectures)

//Add Lectures to particular Course
router.route("/course/:id").post(isAuthenticated, authorizedAdmin, singleUpload, addCourseLectures)

// Delete course

router.route("/course/:id").delete(isAuthenticated, authorizedAdmin, deleteCourse)

router.route("/lecture").delete(isAuthenticated, authorizedAdmin, deleteLecture)


export default router;