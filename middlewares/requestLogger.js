import { error } from "console";
import logger from "../config/loggerConfig.js";

const requestLogger = (req, res, next)=> {
    const startTime = Date.now();

    res.on("finish", ()=> {
        const duration = Date.now() - startTime;
        const {method, originalUrl} = req;
        const statusCode = res.statusCode;

        const message = `${method} ${originalUrl} - ${statusCode} - ${duration}ms`;

        if(statusCode >= 200 && statusCode < 300) {
            logger.info(message);
        }
        else if(statusCode >= 300 && statusCode < 400) {
            logger.warn(message);
        }
        else if(statusCode >= 400 && statusCode < 500) {
            logger.error(message);
        }
        else if (statusCode >= 500) {
            logger.error(message);
        }
        else {
            logger.debug(message);
        }
    });
    next();
}

export default requestLogger;