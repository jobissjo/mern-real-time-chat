import Message from "../models/message.js";
import Chat from "./../models/chat.js";

export const createNewChat = async (data) => {
    const chat = new Chat(data);
    const savedChat = await chat.save()
    let messages = savedChat.populate('members');
    return messages
}

export const getAllChats = async (data) => {
    const currentUser = data.userId;
    const allChats = await Chat.find({ members: { $in: currentUser } })
        .populate('members')
        .populate({ path: 'lastMessage', 'match': {} })
        .sort({ updatedAt: -1 });

    return allChats;
}

export const clearUnreadMsg = async (data) => {
    const chatId = data.chatId;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        res.status(404).send({
            message: "No Chat found with given chat ID."
        })
    };

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { unreadMessageCount: 0 },
        { new: true }
    ).populate('members').populate('lastMessage');

    await Message.updateMany(
        { chatId, read: false },
        { read: true }
    );

    return updatedChat;

}