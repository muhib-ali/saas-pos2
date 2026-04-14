import { RouteConfig } from '../interfaces/route-config.interface';

export const moduleRoutes: RouteConfig[] = [
  {
    path: '/modules/create',
    method: 'POST',
    targetService: 'system-user-service',
    targetPath: '/modules/create',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/modules/:id',
    method: 'GET',
    targetService: 'system-user-service',
    targetPath: '/modules/getById/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/modules',
    method: 'GET',
    targetService: 'system-user-service',
    targetPath: '/modules/getAll',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/modules/:id',
    method: 'PUT',
    targetService: 'system-user-service',
    targetPath: '/modules/update/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/modules/:id',
    method: 'DELETE',
    targetService: 'system-user-service',
    targetPath: '/modules/delete/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
];
