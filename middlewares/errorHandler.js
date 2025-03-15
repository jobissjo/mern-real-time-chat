import logger from "../config/loggerConfig.js";

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).send({ message });
}

export default errorHandler;