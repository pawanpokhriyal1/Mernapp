import express from "express"
import { getAllCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/courses").get(getAllCourse)
export default router;