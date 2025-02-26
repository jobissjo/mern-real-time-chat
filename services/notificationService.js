import Notification from "../models/notification.js"

export const getNotificationOfUser = async (user_id)=> {
    const notifications = await Notification.find({recipient: user_id})
    return notifications
}

export const markNotificationAsRead = async (notification_id, user_id)=> {
    const notification = await Notification.findOneAndUpdate({_id:notification_id, recepient:user_id}, {read: true}, {new: true})
    return notification
}

export const clearAllNotificationOfUser = async (user_id)=> {
    await Notification.updateMany({recipient: user_id, read: false}, {read: true})
}