import Redis from "ioredis";
import logger from "./loggerConfig.js";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./constants.js";



const redis = new Redis({
    host:  REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    tls:true
})

redis.on("connect", ()=> logger.info("Connected to Redis"));
redis.on("error", (err)=> logger.error('Redis connected error'));

export default redis;