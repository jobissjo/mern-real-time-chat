import { Router } from "express";
import { clearAllNotification, notificationList, readNotificationOfUser } from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get('/get-all-notifications', notificationList)
notificationRouter.put('read-notification/:notificationId', readNotificationOfUser)
notificationRouter.put('clear-all-notifications', clearAllNotification)


export default notificationRouter;