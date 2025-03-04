import { getNotificationOfUser, markNotificationAsRead, clearAllNotificationOfUser, deleteAllNotificationOfUser } from "../services/notificationService.js";


const notificationList = async (req, res)=> {
    try{
        const notifications = await getNotificationOfUser(req.body.userId)
        res.status(200).send({message: "Notification List fetched successfully", data: notifications})
    } catch (error) {
        res.status(500).send({ message: "Something goes wrong, try again latter" });
    }
}

const readNotificationOfUser = async (req, res)=> {
    try{
        await markNotificationAsRead(req.body.notificationId, req.body.userId)
        res.status(200).send({message: "Notification marked as read successfully"})
    } catch (error) {
        res.status(500).send({ message: "Something goes wrong, try again latter" });
    }
}

const clearAllNotification = async (req, res)=> {
    try{
        await clearAllNotificationOfUser(req.body.userId)
        res.status(200).send({message: "All notifications cleared successfully"})
    }
    catch (error) {
        res.status(500).send({ message: "Something goes wrong, try again latter" });
    }
}

const deleteAllNotifications = async (req, res)=> {
    try{
        await deleteAllNotificationOfUser(req.body.userId)
        res.status(200).send({message: "All notifications deleted successfully"})
    }
    catch (error) {
        res.status(500).send({ message: "Something goes wrong, try again latter" });
    }
}

export {notificationList, readNotificationOfUser, clearAllNotification, deleteAllNotifications};