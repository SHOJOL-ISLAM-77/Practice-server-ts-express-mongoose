import { ErrorRequestHandler, NextFunction } from "express";
import validationError from "../utils/validationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next: NextFunction) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let error = err;

  if (err.name === "ValidationError") {
    const customErrors = validationError(err);
    message = customErrors.message;
    error = customErrors.err;
  }

  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;
