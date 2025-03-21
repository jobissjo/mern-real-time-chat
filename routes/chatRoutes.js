import { Router } from "express";
import { clearUnreadMsgController, createNewChatController, getAllChatsController, getChatById } from "../controllers/chatController.js";

const chatRouters =  Router();

chatRouters.post('/create-new-chat', createNewChatController)
chatRouters.get("/get-all-chats", getAllChatsController)
chatRouters.post("/clear-unread-message",clearUnreadMsgController)
chatRouters.get("/get-all-chats/:chatId", getChatById)

export default chatRouters;