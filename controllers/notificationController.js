import { getNotificationOfUser, markNotificationAsRead, clearAllNotificationOfUser } from "../services/notificationService.js";


const notificationList = async (req, res)=> {
    try{
        await getNotificationOfUser(req.body.userId)
        res.status(200).send({message: "Notification List fetched successfully"})
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

export {notificationList, readNotificationOfUser, clearAllNotification};