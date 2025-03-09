import dotenv from "dotenv"
dotenv.config({path: './config.env'})

import dbconfig from './config/dbConfig.js';
import server from './app.js';
import logger from "./config/loggerConfig.js";



const port = process.env.PORT || 3000;
server.listen(port, ()=> {
    logger.info(`listening on port: ${port}`);
})