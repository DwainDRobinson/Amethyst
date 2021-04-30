'use strict';

import winston from 'winston';
import path from 'path';
import config from '../config';
const { NODE_ENV, LOGGER_DIRECTORY } = config;
const { createLogger, format, transports } = winston;
const { splat, combine, printf, colorize, simple, timestamp } = format;
const { File, Console } = transports;

const myFormat = printf(({ level, message, meta, timestamp }) => {
  return `${timestamp} ${level} ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const fileMaxSize = '2MB';

const logger = createLogger({
  level: 'info',
  format: combine(splat(), timestamp(), myFormat),
  defaultMeta: {
    service: 'amethyst'
  },
  transports: [
    new File({
      filename: path.resolve(`${LOGGER_DIRECTORY}/out.log`),
      level: 'info',
      maxsize: fileMaxSize,
      tailable: true
    }),
    new File({
      filename: path.resolve(`${LOGGER_DIRECTORY}/error.log`),
      level: 'error',
      maxsize: fileMaxSize,
      tailable: true
    })
  ],
  exceptionHandlers: [
    new File({
      filename: path.resolve(`${LOGGER_DIRECTORY}/exceptions.log`),
      maxsize: fileMaxSize,
      tailable: true
    })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (NODE_ENV !== 'production') {
  logger.add(
    new Console({
      format: combine(colorize(), simple())
    })
  );
}

export default logger;
