import express from 'express';

const router = express.Router();

router.get('/user-service/v1/', (_, res) => {
  res.send('Welcome to Amethyst User Manager Service!').status(200);
});

router.get('/user-service/v1/probeCheck', (_, res) => {
  res.send('Amethyst User Manager service up and running!').status(200);
});

export default router;
