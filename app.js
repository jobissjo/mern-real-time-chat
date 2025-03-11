import express from "express";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";
import chatRouters from "./routes/chatRoutes.js";
import messageRouters from "./routes/messageRoutes.js";
import {createServer} from 'http'
import cors from 'cors'
import friendRequestRouter from "./routes/friendRequest.js";
import notificationRouter from "./routes/notificationRoutes.js";
import preferenceRouter from "./routes/preferenceRoutes.js";
import requestLogger  from "./middlewares/requestLogger.js";
import { setupWebSocket } from "./websocket.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import { UserRateLimiter } from "./middlewares/rateLimiter.js";


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

setupWebSocket(server)
// Routes

app.use('/api/auth', authRouter);
app.use('/api/user', authMiddleware, UserRateLimiter, userRouter);
app.use('/api/chat', authMiddleware, UserRateLimiter, chatRouters);
app.use('/api/message', authMiddleware, UserRateLimiter, messageRouters);
app.use('/api/friend', authMiddleware, UserRateLimiter, friendRequestRouter);
app.use('/api/notification', authMiddleware, UserRateLimiter, notificationRouter);
app.use('/api/preferences', authMiddleware, UserRateLimiter, preferenceRouter);




export default server