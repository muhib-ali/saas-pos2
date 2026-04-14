"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoutes = void 0;
exports.roleRoutes = [
    {
        path: '/roles/create',
        method: 'POST',
        targetService: 'system-user-service',
        targetPath: '/roles/create',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/roles/:id',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/roles/getById/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/roles',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/roles/getAll',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/roles/:id',
        method: 'PUT',
        targetService: 'system-user-service',
        targetPath: '/roles/update/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/roles/:id',
        method: 'DELETE',
        targetService: 'system-user-service',
        targetPath: '/roles/delete/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
];
//# sourceMappingURL=roles.routes.js.map