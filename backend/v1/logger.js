import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, errors } = format;

// Define the custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Create the logger
const logger = createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }), // Log stack traces
    logFormat
  ),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }), // Log only errors to error.log
    new transports.File({ filename: "info.log", level: "info" }),
    new transports.File({ filename: "combined.log" }), // Log all levels to combined.log
  ],
});

export default logger;
