import { Router } from "express";
import { clearAllNotification, deleteAllNotifications, notificationList, readNotificationOfUser } from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const notificationRouter = Router();

notificationRouter.get('/get-all-notifications', authMiddleware,notificationList)
notificationRouter.put('/read-notification/', authMiddleware,readNotificationOfUser)
notificationRouter.put('/clear-all-notifications', authMiddleware,clearAllNotification)
notificationRouter.put('/delete-all-notifications', authMiddleware, deleteAllNotifications)


export default notificationRouter;