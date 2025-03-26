import Message from "../models/message.js";
import { CustomError } from "../utils/helper.js";
import { decryptKey, generateChatEncryptedKey } from "../utils/security.js";
import Chat from "./../models/chat.js";

export const createNewChat = async (data) => {
    const encryptedKey = await generateChatEncryptedKey()
    const chat = new Chat({...data, encryptedKey});
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
    const decryptedChats =  await Promise.all( allChats.map( async (chat) => {
        return {
            ...chat.toObject(),
            encryptedKey: await decryptKey(chat.encryptedKey)
        }
    }))
    return decryptedChats;
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

export const clearChatMsg = async ({chatId, userId}) => {
    const chat = await Chat.findById(chatId);
    if (!chat?.members.map(mem => mem._id).includes(userId)){
        throw new CustomError("You do not have permission to clear message in this chat", 403)
    }
    await chat.updateOne({
        $set : {
            lastMessage: null,
            unreadMessageCount: 0,
            clearedChatAt: new Date()
        }
    })
}


export const blockChat = async ({chatId, userId}) => {
    const chat = await Chat.findById(chatId);
    if (!chat?.members.map(mem => mem._id).includes(userId)){
        throw new CustomError("You do not have permission to block this chat", 403)
    }
    await chat.updateOne({
        $set : {
            blocked: true
        }
    })
}

export const getChatByIdService = async ({chatId, userId}) => {
    console.log(chatId, userId);
    
    const chat = await Chat.findById(chatId);

    if (!chat?.members.includes(userId)){
        throw new CustomError("You do not have permission to view this chat", 403)
    }
    return chat;
}