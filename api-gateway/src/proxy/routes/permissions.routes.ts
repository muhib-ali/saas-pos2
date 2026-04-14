import { RouteConfig } from '../interfaces/route-config.interface';

export const permissionRoutes: RouteConfig[] = [
  {
    path: '/permissions/create',
    method: 'POST',
    targetService: 'system-user-service',
    targetPath: '/permissions/create',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/permissions/:id',
    method: 'GET',
    targetService: 'system-user-service',
    targetPath: '/permissions/getById/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/permissions',
    method: 'GET',
    targetService: 'system-user-service',
    targetPath: '/permissions/getAll',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/permissions/:id',
    method: 'PUT',
    targetService: 'system-user-service',
    targetPath: '/permissions/update/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
  {
    path: '/permissions/:id',
    method: 'DELETE',
    targetService: 'system-user-service',
    targetPath: '/permissions/delete/:id',
    authRequired: true,
    tenantRequired: true,
    timeout: 30000,
  },
];
