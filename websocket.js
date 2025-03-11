import { Server } from "socket.io";
import redis from "./config/redisConfig.js";
import logger from "./config/loggerConfig.js";

const ONLINE_USERS_KEY = "online_users";
const SOCKET_USER_MAP_KEY = "socket_user_map";

export const setupWebSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        }
    });

    io.on("connection", (socket)=> {
        socket.on('join-room', userId => {
            socket.join(userId);
            logger.info(`User ${userId} joined room`);
        })

        socket.on('send-message', (msgData) => {
            logger.info("Websocket send message and count updated  to members: "+msgData.members[0] + ", " + msgData.members[1]);
            io.to(msgData.members[0])
            .to(msgData.members[1])
            .emit('receive-message', msgData);
    
            io
            .to(msgData.members[0])
            .to(msgData.members[1])
            .emit('message-count-updated', msgData)
        })

        socket.on("clear-unread-message", (message)=> {
            logger.info("Websocket clear unread message to members: "+ message.members[0] + ", "+ message.members[1]);
            io
            .to(message.members[0])
            .to(message.members[1])
            .emit("message-count-cleared", message)
        })

        socket.on('user-typing', (data)=> {
            logger.info("Websocket user started typing in chats of :"+ data.members[0] + ", "+ data.members[1]);
            io
            .to(data.members[0])
            .to(data.members[1])
            .emit("started-typing", data)
        });

        socket.on('user-login', async (userId)=> {
            logger.info("User is logged in:"+ userId)
            try{
             await redis.sadd(ONLINE_USERS_KEY, userId);
             const onlineUsers = await redis.smembers(ONLINE_USERS_KEY);
             await redis.hset(SOCKET_USER_MAP_KEY, socket.id, userId); 
     
             socket.emit("online-users", onlineUsers)
            }
            catch(error){
                 logger.error(error)
            }
            
             
        });

        socket.on('user-logout', async (userId)=> {
            logger.info("User is logged out: "+ userId)
            try{
                await redis.srem(ONLINE_USERS_KEY, userId);
                const onlineUsers = await redis.smembers(ONLINE_USERS_KEY);
                await redis.hdel(SOCKET_USER_MAP_KEY, socket.id);
                socket.emit("online-users", onlineUsers);
                logger.info(`User ${userId} disconnected`);
            }
            catch(error){
                logger.error(error)
            }
        })

        socket.on('disconnect', async ()=>{
            logger.info("User disconnected from websocket");
        
            try{
                const userId = await redis.hget(SOCKET_USER_MAP_KEY, socket.id);
                if(userId){
                    await redis.srem(ONLINE_USERS_KEY, userId);
                    await redis.hdel(SOCKET_USER_MAP_KEY, socket.id);
    
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

}