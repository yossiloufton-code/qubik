import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error';
import { ErrorCodes } from '../errors/error-codes';

interface RequestValidationSchema {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

const formatZodError = (error: ZodError) => {
  return error.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
};

export const validateRequest = (schema: RequestValidationSchema): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      /**
       * Express 5 exposes req.query as a getter-only property.
       * So we validate it, but we do not assign it back.
       */
      if (schema.query) {
        schema.query.parse(req.query);
      }

      /**
       * Same idea: validate params without mutating the Express request object.
       */
      if (schema.params) {
        schema.params.parse(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(
          new AppError('Invalid request data', 400, ErrorCodes.BadRequest, {
            issues: formatZodError(error),
          }),
        );
        return;
      }

      next(error);
    }
  };
};