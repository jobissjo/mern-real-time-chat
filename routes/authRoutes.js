import { Router } from "express";
import {loginUser, signUpUser, verifyEmail} from "../controllers/authController.js";

const router = Router();

router.post('/verify-email', verifyEmail)
router.post('/signup', signUpUser)
router.post('/login', loginUser)

export default router;