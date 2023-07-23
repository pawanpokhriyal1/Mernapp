import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, cancelSubscription, getRazorpayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

//Buy Subscription

router.route("/subscribe").get(isAuthenticated, buySubscription);

//GET RAZORPAY KEY
router.route("/razorpaykey").get(getRazorpayKey);

//VERIFY PAYMENT AND SAVE REFERENCE IN DATABASE
router.route("/paymentverification").get(isAuthenticated, paymentVerification);


//cancel subscription 
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription)
export default router;