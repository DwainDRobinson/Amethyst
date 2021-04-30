'use strict';

import http from 'http';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import noCache from 'nocache';
import cors from 'cors';
import responseTime from 'response-time';

import { requestResponse, errorHandler } from './utils';
import logger from './logger';
import swagger from './swagger';
import { userRouter, appRouter } from './routes';

// Create the Express application object
const server = express();

// specify a single subnet
server.set('trust proxy', true);

// Enabled cors
server.use(cors());
logger.info('CORS enabled.');

//Helmet middleware
server.use(helmet());
server.use(helmet.referrerPolicy());
logger.info('Loaded helmet middleware.');

server.use(noCache());
logger.info('Loaded no-cache middleware.');

//Compression middleware
server.use(compression());
logger.info('Loaded compression middleware.');

//BodyParser middleware
server.use(express.urlencoded({ limit: '50Mb', extended: false }));
server.use(express.json({ limit: '50Mb' }));
logger.info('Loaded body-parser middleware.');

// Response time middleware
server.use(responseTime());
logger.info('Loaded response time middleware.');

//error handler
server.use(errorHandler);
logger.info('Loaded error handler middleware.');

//route handler with request/response
server.use(requestResponse);
logger.info('Loaded request/response middleware.');

//Router middleware
server.use(appRouter);
logger.info('Loaded server routes middleware.');

//Swagger middleware
server.use('/user-service/v1/swagger', swagger);
logger.info('Loaded swagger documentation middleware.');

export default http.createServer(server);
