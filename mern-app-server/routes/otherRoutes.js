
import express from "express"
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import { contact, courseRequest, getDashBoardStats } from "../controllers/otherControllers.js";

const router = express.Router();

//contact

router.route("/contact").post(isAuthenticated, contact);

//courseRequest
router.route("/courserequest").post(isAuthenticated, courseRequest);

// adminstats dashboard
router.route("/admin/stats").get(isAuthenticated, authorizedAdmin, getDashBoardStats);

export default router;