import { Router } from "express";
import {changePassword, forgotPassword, loginUser, resetPassword, signUpUser, verifyEmail, verifyOtp} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { anonymousRateLimiter, UserRateLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post('/verify-email', anonymousRateLimiter, verifyEmail);
router.post('/signup', anonymousRateLimiter, signUpUser);
router.post('/login', anonymousRateLimiter, loginUser);
router.post('/change-password', authMiddleware, UserRateLimiter, changePassword);
router.post('/forgot-password', forgotPassword, anonymousRateLimiter)
router.post('/reset-password', resetPassword, anonymousRateLimiter);
router.post('/verify-reset-otp', anonymousRateLimiter, verifyOtp)

export default router;