import { Router } from "express";
import {changePassword, loginUser, signUpUser, verifyEmail} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/verify-email', verifyEmail);
router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);
// router.post('/forgot-password', )

export default router;