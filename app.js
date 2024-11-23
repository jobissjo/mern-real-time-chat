import express from "express";
import authRouter from "./controllers/authController.js"
import userRouter from "./controllers/userController.js";
import chatRouters from "./controllers/chatController.js";
import messageRouters from "./controllers/messageController.js";
import cors from 'cors';



const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
);

app.use(express.json());

// Routes

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouters);
app.use('/api/message', messageRouters);

export default app