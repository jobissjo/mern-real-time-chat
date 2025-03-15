import _dbconfig from './config/dbConfig.js';
import server from './app.js';
import logger from "./config/loggerConfig.js";
import { HOST, PORT } from "./config/constants.js";




server.listen(PORT,HOST, ()=> {
    logger.info(`listening on port: ${PORT}`);
})