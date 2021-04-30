import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { Router } = express;

const router = Router();

const { version } = require('../../package.json');

const definition = {
  openapi: '3.0.0',
  info: {
    version,
    title: 'User Microservice API Definition',
    description: 'API Definition for the User Microservice',
    contact: {
      name: 'Dwain Robinson',
      email: 'robinson.dwain.developer@gmail.com'
    }
  },
  servers: []
};

const options = {
  definition,
  apis: [`${__dirname}/definitions/*.yml`]
};

const openApiSpecification = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpecification, { explorer: true }));

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openApiSpecification);
});

export default router;
