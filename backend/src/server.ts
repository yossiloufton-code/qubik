import { app } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';

const server = app.listen(env.PORT, () => {
  logger.info('Server is running', {
    port: env.PORT,
    env: env.NODE_ENV,
  });
});

const shutdown = (signal: string) => {
  logger.info(`Received ${signal}. Closing server...`);

  server.close(() => {
    logger.info('Server closed successfully');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
