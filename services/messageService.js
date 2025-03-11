import Chat from "../models/chat.js";
import Message from "../models/message.js";

export const sendMsg = async (msgData) => {

    const newMessage = new Message(msgData);
    const savedMessage = await newMessage.save();

    await Chat.findOneAndUpdate({ _id: msgData.chatId },
        {
            lastMessage: savedMessage._id,
            $inc: { unreadMessageCount: 1 }
        }
    )
    return savedMessage;
}

export const getAllMsgs = async (chatId) => {
    const allMessages = await Message.find({ chatId: chatId })
        .sort({ createdAt: 1 })
    return allMessages;
}