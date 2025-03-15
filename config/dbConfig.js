import mongoose from 'mongoose'
import logger from './loggerConfig.js';
import { MONGO_CONNECTION_STRING } from './constants.js';


mongoose.connect(MONGO_CONNECTION_STRING)


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