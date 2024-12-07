import createError from 'http-errors';

const errorHandler = (err, req, res, next) => {
  if (!createError.isHttpError(err)) {
    err = createError(500, err.message);
  }

  console.error(err.stack);

  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;