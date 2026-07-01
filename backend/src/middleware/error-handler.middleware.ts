import type { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/app-error';
import { ErrorCodes } from '../errors/error-codes';
import { isProduction } from '../config/env';
import { logger } from '../utils/logger';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const isKnownError = error instanceof AppError;

  const statusCode = isKnownError ? error.statusCode : 500;
  const code = isKnownError ? error.code : ErrorCodes.InternalServerError;
  const message = isKnownError ? error.message : 'Something went wrong';

  if (statusCode >= 500) {
    logger.error(message, {
      code,
      stack: error instanceof Error ? error.stack : undefined,
      details: isKnownError ? error.details : undefined,
    });
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      details: !isProduction && isKnownError ? error.details : undefined,
    },
  });
};
