import express from "express"
import { register, login, logout, getMyProfile, changePassword, updateProfile, updateProfilePicture, forgetPassword, resetPassword, addToPlayList, removeFromPlayList, getAllUsers, updateUserRole, deleteUser, deleteMyProfile } from "../controllers/userControllers.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//to register a new user 
router.route("/register").post(singleUpload, register)

//login
router.route("/login").post(login)

//logout
router.route("/logout").get(logout)

//Get my profile
router.route("/me").get(isAuthenticated, getMyProfile)
//Delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile)
//ChangePassword

router.route("/changepassword").put(isAuthenticated, changePassword);

//UpdateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile)

//UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, updateProfilePicture)
//ForgetPassword

router.route("/forgetpassword").post(forgetPassword);
//ResetPassword
router.route("/resetpassword/:token").put(resetPassword);
//AddtoPlayList
router.route("/addtoplaylist").post(isAuthenticated, addToPlayList);
//RemoveFromPlayList
router.route("/removefromplaylist").post(isAuthenticated, removeFromPlayList);

//Admin Routes

router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers)

router.route("/admin/user/:id").put(isAuthenticated, authorizedAdmin, updateUserRole).delete(isAuthenticated, authorizedAdmin, deleteUser)

export default router;