import {Router} from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import Chat from "../models/chat.js";
import Message from "../models/message.js";

const messageRouter = new Router();

messageRouter.post("/send-message", authMiddleware, async (req, res) => {
    try{
        const newMessage =  new Message(req.body);
        const savedMessage = await newMessage.save();

        // Update the last message
        // const currentChat = Chat.findById(req.body.chatId);
        // currentChat.lastMessage = savedMessage._id;
        // await currentChat.save();

        Chat.findOneAndUpdate({_id: req.body.chatId}, 
            {
            lastMessage: savedMessage._id,
            $inc: {unreadMessageCount: 1}}
        )

        res.status(201).send({
            "message": "Message send successfully",
            "data": savedMessage
        })

    }catch (err) {
        res.status(400).send({message: error.message});
    }
})

messageRouter.get('/ -messages/:chatId', authMiddleware , async (req, res)=> {
    try {
        const allMessages = await Message.find({chatId: req.params.chatId})
                .sort({createdAt: 1})
        res.status(200).send({"message": "Messages fetched successfully", 
            data: allMessages
        })
    }
    catch (error) {
        res.status(400).send({message: error.message});
    }
})

export default messageRouter;
