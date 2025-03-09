import express from "express";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";
import chatRouters from "./routes/chatRoutes.js";
import messageRouters from "./routes/messageRoutes.js";
import {createServer} from 'http'
import { Server } from 'socket.io';
import cors from 'cors'
import friendRequestRouter from "./routes/friendRequest.js";
import notificationRouter from "./routes/notificationRoutes.js";
import preferenceRouter from "./routes/preferenceRoutes.js";
import logger from "./config/loggerConfig.js";
import redis from "./config/redisConfig.js";
import requestLogger  from "./middlewares/requestLogger.js";


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
app.use(requestLogger); 
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
app.use('/api/friend', friendRequestRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/preferences', preferenceRouter);


const ONLINE_USERS_KEY = 'online_users';
const SOCKET_USER_MAP = 'socket_user_map';

io.on('connection', socket => {
    socket.on('join-room', userId => {
        socket.join(userId);
        logger.info(`User ${userId} joined room`);
    })
    socket.on('send-message', (msgData) => {
        
        io.to(msgData.members[0])
        .to(msgData.members[1])
        .emit('receive-message', msgData);

        io
        .to(msgData.members[0])
        .to(msgData.members[1])
        .emit('message-count-updated', msgData)
    })

    socket.on("clear-unread-message", (message)=> {
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

    socket.on('user-login', async (userId)=> {
       try{
        await redis.sadd(ONLINE_USERS_KEY, userId);
        const onlineUsers = await redis.smembers(ONLINE_USERS_KEY);
        await redis.hset(SOCKET_USER_MAP, socket.id, userId); 

        socket.emit("online-users", onlineUsers)
       }
       catch(error){
            logger.error(error)
       }
       
        
    })

    socket.on('user-logout', async (userId)=> {
        try{
            await redis.srem(ONLINE_USERS_KEY, userId);
            const onlineUsers = await redis.smembers(ONLINE_USERS_KEY);
            await redis.hdel(SOCKET_USER_MAP, socket.id);
            socket.emit("online-users", onlineUsers);
            logger.info(`User ${userId} disconnected`);
        }
        catch(error){
            logger.error(error)
        }
    })

    socket.on('disconnect', async ()=>{
        
        try{
            const userId = await redis.hget(SOCKET_USER_MAP, socket.id);
            if(userId){
                await redis.srem(ONLINE_USERS_KEY, userId);
                await redis.hdel(SOCKET_USER_MAP, socket.id);

                const onlineUsers = await redis.smembers(ONLINE_USERS_KEY)
                socket.emit("online-users", onlineUsers)
                logger.info(`User ${userId} disconnected`);
            }
            
        }
        catch(error){
            logger.error(error)
        }
    })

})


export default server