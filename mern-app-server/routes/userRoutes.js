import express from "express"
import { register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword, addToPlayList, removeFromPlayList } from "../controllers/userControllers.js";
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

router.route("/changepassword").put(isAuthenticated, changePassword);

//UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile)

//UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated, updateProfilePicture)
//ForgetPassword

router.route("/forgetpassword").post(forgetPassword);
//ResetPassword
router.route("/resetpassword/:token").put(resetPassword);
//AddtoPlayList
router.route("/addtoplaylist").post(isAuthenticated, addToPlayList);
//RemoveFromPlayList
router.route("/removefromplaylist").post(isAuthenticated, removeFromPlayList);

export default router;