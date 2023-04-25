import { NextFunction, Request, Response } from 'express';

import AppError from './../utils/appError';

const handleJWTError = (): AppError =>
  new AppError('Invalid token. Please login again!', 401);

const handleJWTExpired = (): AppError =>
  new AppError('Your token has expired! Please login again.', 401);

const sendError = (err: AppError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode ||= 500;
  err.status ||= 'error';

  if (err.name === 'JsonWebTokenError') {
    err = handleJWTError();
  }

  if (err.name === 'TokenExpiredError') {
    err = handleJWTError();
  }

  sendError(err, req, res);
};

export default globalErrorHandler;
