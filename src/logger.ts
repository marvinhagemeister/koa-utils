import * as winston from "winston";

/** Singleton logger instance. Server should never log to files, only stdout */
const logger = new winston.Logger({
  transports: [new winston.transports.Console()],
});

const levels = ["error", "warn", "info", "verbose", "debug"];
let level = process.env.LOG_LEVEL;
if (level === undefined) {
  level = process.env.NODE_ENV === "production" ? "error" : "debug";
} else if (!levels.includes(level)) {
  throw new Error(
    `Unknown log level "${level}". Must be one of "${levels.join(", ")}"`,
  );
}

logger.level = level;
export default logger;
