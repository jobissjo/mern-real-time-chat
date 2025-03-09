import Redis from "ioredis";
import logger from "./loggerConfig.js";

// Connect to Redis
const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
})

redis.on("connect", ()=> logger.info("Connected to Redis"));
redis.on("error", (err)=> logger.error('Redis connected error'));

export default redis;