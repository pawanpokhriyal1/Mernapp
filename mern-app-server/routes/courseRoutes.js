import express from "express"
import { createCourse, getAllCourse } from "../controllers/courseController.js";

const router = express.Router();
//Get All courses without Lectures
router.route("/courses").get(getAllCourse)
// Create new Course -only admin
router.route("/createcourse").post(createCourse)

//Add Lecture ,Delete lecture ,Get Course Details

// Delete lectures
export default router;