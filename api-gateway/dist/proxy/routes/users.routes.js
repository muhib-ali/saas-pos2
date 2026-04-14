"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
exports.userRoutes = [
    {
        path: '/users/create',
        method: 'POST',
        targetService: 'system-user-service',
        targetPath: '/users/create',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/users/:id',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/users/getById/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/users',
        method: 'GET',
        targetService: 'system-user-service',
        targetPath: '/users/getAll',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/users/:id',
        method: 'PUT',
        targetService: 'system-user-service',
        targetPath: '/users/update/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
    {
        path: '/users/:id',
        method: 'DELETE',
        targetService: 'system-user-service',
        targetPath: '/users/delete/:id',
        authRequired: true,
        tenantRequired: true,
        timeout: 30000,
    },
];
//# sourceMappingURL=users.routes.js.map