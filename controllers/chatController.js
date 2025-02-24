import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Chat from "./../models/chat.js";
import Message from "../models/message.js";

const chatRouters =  Router()

const createNewChat = async (req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save()
        let messages = savedChat.populate('members');
        // savedChat.populate('members')

        res.status(201).send({
            message: "Chat created successfully",
            data: messages
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}

const getAllChats =  async (req, res) => {
    try {
        const currentUser = req.body.userId;
        const allChats = await Chat.find({members: {$in: currentUser}})
                .populate('members')
                .populate({path: 'lastMessage', 'match': {}})
                .sort({updatedAt: -1});

        res.send({
            message: "Chat details fetched successfully",
            data: allChats
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
}


const clearUnreadMsg = async (req, res)=> { 
    try{
        const chatId = req.body.chatId;

        const chat = await Chat.findById(chatId);

        if(!chat){
            res.status(404).send({
                message: "No Chat found with given chat ID."
            })
        };

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {unreadMessageCount: 0},
            {new: true}
        ).populate('members').populate('lastMessage');

        await Message.updateMany(
            {chatId, read: false}, 
            {read: true}
        );

        res.status(200).send({
            message: "Unread messages cleared successfully",
            data: updatedChat
        })

    }catch (error) {
        res.status(400).send({
            message: error.message,

        })
    }
}

export {clearUnreadMsg, getAllChats, createNewChat}