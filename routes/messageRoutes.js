import {Router} from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const messageRouter = new Router();


messageRouter.post("/send-message", authMiddleware,sendMessage)
messageRouter.get('/get-all-messages/:chatId', authMiddleware ,getAllMessages);


export default messageRouter;