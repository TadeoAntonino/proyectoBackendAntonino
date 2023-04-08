import { createLogger, transports, format } from "winston";
import config from "../config/config.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "purple",
  },
};

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(
      (info) =>
        `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
});

const dev = new transports.Console({
  level: "debug",
  format: format.combine(
    format.colorize({ all: true }),
    format.printf(
      (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
});
const prod = new transports.File({
  level: "info",
  filename: "../errors.log",
});

if (config.NODE_ENV === "dev") {
  logger.add(dev);
} else {
  logger.add(prod);
}

export default logger;
