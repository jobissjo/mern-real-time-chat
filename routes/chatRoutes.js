import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { clearUnreadMsgController, createNewChatController, getAllChatsController } from "../controllers/chatController.js";

const chatRouters =  Router();

chatRouters.post('/create-new-chat', authMiddleware, createNewChatController)
chatRouters.get("/get-all-chats",authMiddleware, getAllChatsController)
chatRouters.post("/clear-unread-message", authMiddleware,clearUnreadMsgController)

export default chatRouters;