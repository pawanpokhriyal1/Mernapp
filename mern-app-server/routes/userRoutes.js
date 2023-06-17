import express from "express"
import { register, login, logout, getMyProfile } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//to register a new user 
router.route("/register").post(register)

//login
router.route("/login").post(login)

//logout
router.route("/logout").get(logout)

//Get my profile
router.route("/me").get(isAuthenticated, getMyProfile)

//ChangePassword
//UpdatePassword
//UpdateProfile
//UpdateProfilePicture
//ForgetPassword
//ResetPassword
//AddtoPlayList
//RemoveFromPlayList

export default router;