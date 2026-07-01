import type { Response } from 'express';

export const sendSuccess = <TData>(
  res: Response,
  data: TData,
  meta?: Record<string, unknown>,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const sendCreated = <TData>(
  res: Response,
  data: TData,
  meta?: Record<string, unknown>,
) => {
  return sendSuccess(res, data, meta, 201);
};
