import createError from 'http-errors';

const errorHandler = (err, req, res, next) => {
  if (!createError.isHttpError(err)) {
    err = createError(500, err.message);
  }

  // Log the error stack for debugging
  console.error(err.stack);

  // Send user-friendly error message
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;