import type { RequestHandler } from 'express';

export const privateNetworkAccessMiddleware: RequestHandler = (_req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
};