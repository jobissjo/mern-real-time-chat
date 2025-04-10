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
import errorHandler from "./middlewares/errorHandler.js";
import { CustomError } from "./utils/helper.js";
import { allowedOrigins } from "./config/constants.js";


const app = express();

app.use(
    cors({
        origin: (origin, callback)=> {
            if(allowedOrigins.includes(origin)){
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
    
)



app.use(express.json({limit: '2mb'}));
app.use(requestLogger); 
const server = createServer(app);

setupWebSocket(server)
// Routes
app.set('trust proxy', 1); 
app.use('/api/auth', authRouter);
app.use('/api/user', authMiddleware, UserRateLimiter, userRouter);
app.use('/api/chat', authMiddleware, UserRateLimiter, chatRouters);
app.use('/api/message', authMiddleware, UserRateLimiter, messageRouters);
app.use('/api/friend', authMiddleware, UserRateLimiter, friendRequestRouter);
app.use('/api/notification', authMiddleware, UserRateLimiter, notificationRouter);
app.use('/api/preferences', authMiddleware, UserRateLimiter, preferenceRouter);


app.get('/', ()=> {
    throw new CustomError("Custom error message", 400)

})

app.use(errorHandler);

export default server