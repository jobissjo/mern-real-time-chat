import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getUserPreference, updatedUserPreference } from "../controllers/preferenceController.js";

const preferenceRouter = Router();

// Add routes for preference feature here

preferenceRouter.get('/', authMiddleware, getUserPreference);
preferenceRouter.put('/', authMiddleware, updatedUserPreference);

export default preferenceRouter;
