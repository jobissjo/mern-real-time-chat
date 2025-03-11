import { Router } from "express";
import { clearUnreadMsgController, createNewChatController, getAllChatsController } from "../controllers/chatController.js";

const chatRouters =  Router();

chatRouters.post('/create-new-chat', createNewChatController)
chatRouters.get("/get-all-chats", getAllChatsController)
chatRouters.post("/clear-unread-message",clearUnreadMsgController)

export default chatRouters;