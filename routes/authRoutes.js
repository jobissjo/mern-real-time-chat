import { Router } from "express";
import {changePassword, forgotPassword, loginUser, resetPassword, signUpUser, verifyEmail} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { anonymousRateLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post('/verify-email', anonymousRateLimiter, verifyEmail);
router.post('/signup', anonymousRateLimiter, signUpUser);
router.post('/login', anonymousRateLimiter, loginUser);
router.post('/change-password', authMiddleware, anonymousRateLimiter, changePassword);
router.post('/forgot-password', forgotPassword, anonymousRateLimiter)
router.post('/reset-password', resetPassword, anonymousRateLimiter);

export default router;