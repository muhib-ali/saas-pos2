import { registerAs } from '@nestjs/config';

export const ServicesConfig = registerAs('services', () => ({
  authentication: process.env.AUTHENTICATION_SERVICE_URL || 'http://localhost:3001',
  systemUser: process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000',
  authorization: process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003',
  timeout: parseInt(process.env.SERVICE_TIMEOUT || '30000', 10),
  retryAttempts: parseInt(process.env.SERVICE_RETRY_ATTEMPTS || '3', 10),
}));
