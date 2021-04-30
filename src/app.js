'use strict';

import server from './server';
import config from './config';
import models from './models';
import logger from './logger';

/**
 * Start web server
 */
const initServer = async () => {
  const { PORT, HOST } = config;
  try {
    await server.listen(PORT, HOST);
    logger.info(`Host: ${HOST} listening on port: ${PORT}`);
  } catch (err) {
    logger.info(`Host: ${HOST} started with error: ${err}`);
    throw err;
  }
};

/**
 * Connect to mongodb database
 */
const initDB = async () => {
  const { url, options } = config.sources.database;
  const { source } = models;
  try {
    await source.connect(url, options);
  } catch (e) {
    logger.info(`Error connecting to db: ${e}`);
    throw e;
  }
};

const init = async () => {
  logger.info('Starting app...');
  // await initDB();
  await initServer();
};

init();

process
  .on('unhandledRejection', reason => {
    console.log(`Unhandled rejection, reason: ${reason.stack} `);
  })
  .on('uncaughtException', err => {
    console.log(err, 'Uncaught exception thrown.');
    process.exit(1);
  })
  .on('SIGINT', () => {
    /**
     * Close connection to db
     */
    const { source } = models;
    source.disconnect().catch(err => {
      process.exit(err ? 1 : 0);
    });
    console.log('Disconnecting from database and shutting down application.');
  });
