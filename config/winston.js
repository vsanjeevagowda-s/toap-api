const path = require('path');
const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');

const { combine, timestamp, prettyPrint, printf } = format;

let requestlogger = '';
let logger = '';

const options = {
  file: {
    level: 'info',
    filename: `${path.join(__dirname, '..')}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = printf(({ timestamp, ...rest }) => {
  const data = { ...rest }
  return `\n [${timestamp}]: [${JSON.stringify(data)}]`;
});


if (!requestlogger) {
  requestlogger = expressWinston.logger({
    transports: [
      new transports.File(options.file),
      new transports.Console(options.console),
    ],
    format: combine(
      timestamp(),
      myFormat,
    ),
    exitOnError: false,
  });
}

if (!logger) {
  logger = createLogger({
    format: combine(
      timestamp(),
      myFormat,
    ),
    transports: [
      new transports.Console(options.console),
      new transports.File(options.file),
    ],
    exitOnError: false,
  });
}

const infoLogger = (logInfo) => {
  logger.log({ level: 'info', ...logInfo });
};

const errorLogger = (errorInfo) => {
  logger.log({ level: 'error', ...errorInfo });
};

module.exports.requestlogger = requestlogger;
module.exports.infoLogger = infoLogger;
module.exports.errorLogger = errorLogger;
