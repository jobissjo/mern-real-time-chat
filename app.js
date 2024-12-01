import express from "express";
import authRouter from "./controllers/authController.js"
import userRouter from "./controllers/userController.js";
import chatRouters from "./controllers/chatController.js";
import messageRouters from "./controllers/messageController.js";
import {createServer} from 'http'
import { Server } from 'socket.io';
import cors from 'cors'


const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
    
)

app.use(express.json());
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
})

// Routes

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouters);
app.use('/api/message', messageRouters);


io.on('connection', socket => {
    socket.on('send-message-all', data => {
        socket.emit('send-message-by-server', "Message from server: "+ data.text);
    })
})

export default server