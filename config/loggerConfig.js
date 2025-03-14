import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf, colorize, align } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level} : ${info.message}`)
  ),
  transports: [new transports.Console()],
});

export default logger;
