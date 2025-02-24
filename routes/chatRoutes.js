import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { clearUnreadMsg, createNewChat, getAllChats } from "../controllers/chatController.js";

const chatRouters =  Router();

chatRouters.post('/create-new-chat', authMiddleware, createNewChat)
chatRouters.get("/get-all-chats",authMiddleware, getAllChats)
chatRouters.post("/clear-unread-message", authMiddleware,clearUnreadMsg)

export default chatRouters;