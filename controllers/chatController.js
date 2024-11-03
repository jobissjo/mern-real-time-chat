import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Chat from "./../models/chat.js";


const chatRouters =  Router()

chatRouters.post('/create-new-chat', authMiddleware, async (req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        res.status(201).send({
            message: "Chat created successfully",
            data: savedChat
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

chatRouters.get("/get-all-chats", authMiddleware, async (req, res) => {
    try {
        const currentUser = req.body.userId;
        const allChats = await Chat.find({members: {$in: currentUser}})

        res.send({
            message: "Chat details fetched successfully",
            data: allChats
        });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export default chatRouters;