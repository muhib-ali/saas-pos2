"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantRoutes = void 0;
exports.tenantRoutes = [
    {
        path: '/tenants/create',
        method: 'POST',
        targetService: 'system-user-service',
        targetPath: '/tenants/create',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
        rateLimit: { windowMs: 60000, maxRequests: 10 },
    },
    {
        path: '/tenants/:id',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/tenants/getById/:id',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
    },
    {
        path: '/tenants',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/tenants/getAll',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
    },
    {
        path: '/tenants/:id',
        method: 'PUT',
        targetService: 'system-user-service',
        targetPath: '/tenants/update/:id',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
    },
    {
        path: '/tenants/:id',
        method: 'DELETE',
        targetService: 'system-user-service',
        targetPath: '/tenants/delete/:id',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
    },
    {
        path: '/tenants/schema/:schemaName',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/tenants/schema/:schemaName',
        authRequired: true,
        tenantRequired: false,
        timeout: 30000,
    },
];
//# sourceMappingURL=tenants.routes.js.map