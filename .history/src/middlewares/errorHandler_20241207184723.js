import createError from "http-errors";
import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
  // Check if the error is a Prisma known request error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      err = createError(409, "A user with this email already exists");
    }
  }

  // If the error is not an instance of createError, convert it to a 500 error
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