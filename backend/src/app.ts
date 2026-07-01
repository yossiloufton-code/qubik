import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './config/cors';
import { errorHandler } from './middleware/error-handler.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { privateNetworkAccessMiddleware } from './middleware/private-network-access.middleware';
import { requestLogger } from './middleware/request-logger.middleware';
import { apiRoutes } from './routes';

export const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(privateNetworkAccessMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  });
});

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);