import {Router} from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";


const messageRouter = new Router();


messageRouter.post("/send-message",sendMessage)
messageRouter.get('/get-all-messages/:chatId', getAllMessages);


export default messageRouter;