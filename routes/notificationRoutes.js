import { Router } from "express";
import { clearAllNotification, notificationList, readNotificationOfUser } from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const notificationRouter = Router();

notificationRouter.get('/get-all-notifications', authMiddleware,notificationList)
notificationRouter.put('/read-notification/:notificationId', authMiddleware,readNotificationOfUser)
notificationRouter.put('/clear-all-notifications', authMiddleware,clearAllNotification)


export default notificationRouter;