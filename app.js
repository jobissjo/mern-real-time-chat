import express from "express";
import authRouter from "./controllers/authController.js"
import userRouter from "./controllers/userController.js";
import chatRouters from "./controllers/chatController.js";
import messageRouters from "./controllers/messageController.js";
import {createServer} from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import message from "./models/message.js";


const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
    
)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something went wrong!' });
});


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

const LOGGED_IN_USERS =[

]

io.on('connection', socket => {
    socket.on('join-room', userId => {
        socket.join(userId);
        console.log(`User ${userId} joined room`)
    })
    socket.on('send-message', (msgData) => {
        console.log("mesaage recived in server: " , msgData);
        
        io.to(msgData.members[0])
        .to(msgData.members[1])
        .emit('receive-message', msgData);

        io
        .to(msgData.members[0])
        .to(msgData.members[1])
        .emit('message-count-updated', msgData)
    })

    socket.on("clear-unread-message", (message)=> {
        console.log('clear unread message', message);
        io
        .to(message.members[0])
        .to(message.members[1])
        .emit("message-count-cleared", message)
    })

    socket.on('user-typing', (data)=> {
        io
        .to(data.members[0])
        .to(data.members[1])
        .emit("started-typing", data)
    });

    socket.on('user-login', (userId)=> {
        if(!LOGGED_IN_USERS.includes(userId)){
            LOGGED_IN_USERS.push(userId)
        }
        socket.emit("online-users", LOGGED_IN_USERS)
    })

    socket.on('user-logout', (userId)=> {
        LOGGED_IN_USERS.splice(LOGGED_IN_USERS.indexOf(userId), 1)
        socket.emit("online-users", LOGGED_IN_USERS)
    })

})

export default server