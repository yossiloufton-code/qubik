import type { RequestHandler } from 'express';
import { AppError } from '../errors/app-error';
import { ErrorCodes } from '../errors/error-codes';

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} was not found`, 404, ErrorCodes.NotFound));
};
