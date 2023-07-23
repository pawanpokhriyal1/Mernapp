import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Payment } from "../models/Payment.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import crypto from "crypto"

export const buySubscription = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);
    if (user.role === "admin")
        return next(new ErrorHandler("Admin Can't buy the subscription", 400));
    const plan_id = process.env.PLAN_ID || "plan_MERAyeu3jpRqfO";
    const subscription = await instance.subscriptions.create({
        plan_id: plan_id,
        customer_notify: 1,
        total_count: 12,
    })

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();
    res.status(201).json({
        success: true,
        subscriptionId: subscription.id,
    })
})

export const paymentVerification = catchAsyncError(async (req, res, next) => {

    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;


    const user = await User.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto.createHmac("shah256", process.env.RAZORPAY_API_SECRET).update(razorpay_payment_id + "|" + subscription_id, "utf-8").digest("hex");

    const isAuthentic = generated_signature === razorpay_signature;
    if (!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`)

    //database comes here
    await Payment.create({
        razorpay_signature,
        razorpay_payment_id,
        razorpay_subscription_id
    })
    user.subscription.status = "active";

    await user.save();
    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)
})

export const getRazorpayKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY || "rzp_test_sRSZKEBbRuil7a"
    })
})

export const cancelSubscription = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    const subscriptionId = user.subscription.id;
    let refund = false;
    await instance.subscriptions.cancel(subscriptionId);

    const payment = await Payment.findOne({
        razorpay_subscription_id: subscriptionId,
    })

    const gap = Date.now() - payment.createdAt;

    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

    if (refundTime > gap) {
        refund = true;
        await instance.payments.refund(payment.razorpay_payment_id);
    }
    await payment.remove();
    user.subscription.id = undefined;
    user.subscription.status = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: refund ? "Subscription Cancelled,You will received full refund within 7 days" : "Subscription cancelled ,No refund initiated as subscription was caancelled after 7 days"
    })
})