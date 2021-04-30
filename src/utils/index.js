const requestResponse = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`);
  res.on('finish', () => {
    console.info(
      `${res.statusCode} ${res.statusMessage}; ${res.get('X-Response-Time')} ${
        res.get('Content-Length') || 0
      }b sent`
    );
  });
  next();
};

const errorHandler = (err, req, res, next) => {
  err && console.error('Error: ', err);
  res.status(err.status || 500).send(err.message);
};

export { requestResponse, errorHandler };
