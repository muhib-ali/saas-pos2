export interface RouteConfig {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  targetService: string;
  targetPath: string;
  authRequired: boolean;
  tenantRequired: boolean;
  rateLimit?: {
    windowMs: number;
    maxRequests: number;
  };
  timeout?: number;
  retryAttempts?: number;
}
