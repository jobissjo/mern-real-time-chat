import { Router } from "express";
import { getUserPreference, updatedUserPreference } from "../controllers/preferenceController.js";

const preferenceRouter = Router();

// Add routes for preference feature here

preferenceRouter.get('/',  getUserPreference);
preferenceRouter.put('/',  updatedUserPreference);

export default preferenceRouter;
