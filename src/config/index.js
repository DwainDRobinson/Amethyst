'use strict';

import dotenv from 'dotenv';
dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  LOGGER_DIRECTORY: process.env.LOGGER_DIRECTORY,
  sources: {
    database: {
      url: process.env.MONGODB_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      }
    }
  }
};

export default config;
