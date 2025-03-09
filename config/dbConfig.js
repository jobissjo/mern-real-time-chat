import mongoose from 'mongoose'
import dotenv from "dotenv"
import logger from './loggerConfig.js';
dotenv.config({path: './config.env'})

mongoose.connect(process.env.CONNECTION_STR)


// connection state
const db = mongoose.connection;

db.on('connected', ()=> {
    logger.info("Mongodb connection established");
});

db.on('error', (err)=> {
    logger.error("Error connecting to MongoDB: ", err);
});

db.on('disconnect', ()=>{
    logger.info("Mongodb connection disconnected");
})

export default db;