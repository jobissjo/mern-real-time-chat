import { Router } from "express";
import { clearAllNotification, deleteAllNotifications, notificationList, readNotificationOfUser } from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get('/get-all-notifications', notificationList)
notificationRouter.put('/read-notification/', readNotificationOfUser)
notificationRouter.put('/clear-all-notifications', clearAllNotification)
notificationRouter.put('/delete-all-notifications',  deleteAllNotifications)


export default notificationRouter;