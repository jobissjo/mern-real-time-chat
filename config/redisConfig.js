import Redis from "ioredis";
import logger from "./loggerConfig.js";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_TLS } from "./constants.js";



const redisOptions = {
    host: REDIS_HOST,
    port: Number(REDIS_PORT), // Ensure it's a number
};



if (REDIS_TLS === "true") {
    redisOptions.tls = true;
}
if (REDIS_PASSWORD){
    redisOptions.password = REDIS_PASSWORD;
}

const redis = new Redis(redisOptions)

redis.on("connect", ()=> logger.info("Connected to Redis"));
redis.on("error", (err)=> logger.error('Redis connected error'));

export default redis;