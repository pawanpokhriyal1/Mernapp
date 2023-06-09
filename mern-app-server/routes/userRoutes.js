import express from "express"
import { register, login, logout } from "../controllers/userControllers.js";

const router = express.Router();

//to register a new user 
router.route("/register").post(register)

//login
router.route("/login").post(login)

//logout
router.route("/logout").get(logout)

//Get my profile
//ChangePassword
//UpdatePassword
//UpdateProfile
//UpdateProfilePicture
//ForgetPassword
//ResetPassword
//AddtoPlayList
//RemoveFromPlayList

export default router;