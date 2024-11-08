import express from "express";
import authRouter from "./controllers/authController.js"
import userRouter from "./controllers/userController.js";
import chatRouters from "./controllers/chatController.js";
import messageRouters from "./controllers/messageController.js";



const app = express();

app.use(express.json());

// Routes

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouters);
app.use('/api/message', messageRouters);

export default app