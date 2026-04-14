"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthorizationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let AuthorizationService = AuthorizationService_1 = class AuthorizationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(AuthorizationService_1.name);
        this.permissionCache = new Map();
        this.roleCache = new Map();
    }
    async hasPermission(userId, permission, tenantId) {
        try {
            const permissions = await this.getUserPermissions(userId, tenantId);
            const hasPermission = permissions.some(p => `${p.module_slug}.${p.permission_slug}` === permission);
            this.logger.log(`User ${userId} has permission ${permission}: ${hasPermission}`);
            return hasPermission;
        }
        catch (error) {
            this.logger.error(`Error checking permission ${permission} for user ${userId}:`, error);
            return false;
        }
    }
    async hasAnyPermission(userId, permissions, tenantId) {
        try {
            const userPermissions = await this.getUserPermissions(userId, tenantId);
            const permissionSlugs = permissions.map(p => p.split('.').pop());
            const hasAny = userPermissions.some(p => permissionSlugs.includes(p.permission_slug));
            this.logger.log(`User ${userId} has any of permissions ${permissions}: ${hasAny}`);
            return hasAny;
        }
        catch (error) {
            this.logger.error(`Error checking permissions for user ${userId}:`, error);
            return false;
        }
    }
    async hasAllPermissions(userId, permissions, tenantId) {
        try {
            const userPermissions = await this.getUserPermissions(userId, tenantId);
            const permissionSlugs = permissions.map(p => p.split('.').pop());
            const hasAll = permissionSlugs.every(slug => userPermissions.some(p => p.permission_slug === slug));
            this.logger.log(`User ${userId} has all permissions ${permissions}: ${hasAll}`);
            return hasAll;
        }
        catch (error) {
            this.logger.error(`Error checking permissions for user ${userId}:`, error);
            return false;
        }
    }
    async getUserPermissions(userId, tenantId) {
        try {
            const cacheKey = `${userId}_${tenantId || 'public'}`;
            if (this.permissionCache.has(cacheKey)) {
                return this.permissionCache.get(cacheKey);
            }
            const response = await this.httpService
                .get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/auth/user-permissions/${userId}`, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            })
                .toPromise();
            const permissions = response.data.data || [];
            this.permissionCache.set(cacheKey, permissions);
            setTimeout(() => this.permissionCache.delete(cacheKey), 5 * 60 * 1000);
            return permissions;
        }
        catch (error) {
            this.logger.error(`Error fetching permissions for user ${userId}:`, error);
            return [];
        }
    }
    async hasRole(userId, role, tenantId) {
        try {
            const roles = await this.getUserRoles(userId, tenantId);
            const hasRole = roles.some(r => r.slug === role);
            this.logger.log(`User ${userId} has role ${role}: ${hasRole}`);
            return hasRole;
        }
        catch (error) {
            this.logger.error(`Error checking role ${role} for user ${userId}:`, error);
            return false;
        }
    }
    async hasAnyRole(userId, roles, tenantId) {
        try {
            const userRoles = await this.getUserRoles(userId, tenantId);
            const roleSlugs = userRoles.map(r => r.slug);
            const hasAny = roles.some(role => roleSlugs.includes(role));
            this.logger.log(`User ${userId} has any of roles ${roles}: ${hasAny}`);
            return hasAny;
        }
        catch (error) {
            this.logger.error(`Error checking roles for user ${userId}:`, error);
            return false;
        }
    }
    async hasAllRoles(userId, roles, tenantId) {
        try {
            const userRoles = await this.getUserRoles(userId, tenantId);
            const roleSlugs = userRoles.map(r => r.slug);
            const hasAll = roles.every(role => roleSlugs.includes(role));
            this.logger.log(`User ${userId} has all roles ${roles}: ${hasAll}`);
            return hasAll;
        }
        catch (error) {
            this.logger.error(`Error checking roles for user ${userId}:`, error);
            return false;
        }
    }
    async getUserRoles(userId, tenantId) {
        try {
            const cacheKey = `${userId}_roles_${tenantId || 'public'}`;
            if (this.roleCache.has(cacheKey)) {
                return this.roleCache.get(cacheKey);
            }
            const response = await this.httpService
                .get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/auth/user-roles/${userId}`, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            })
                .toPromise();
            const roles = response.data.data || [];
            this.roleCache.set(cacheKey, roles);
            setTimeout(() => this.roleCache.delete(cacheKey), 5 * 60 * 1000);
            return roles;
        }
        catch (error) {
            this.logger.error(`Error fetching roles for user ${userId}:`, error);
            return [];
        }
    }
    async isSuperAdmin(userId) {
        return this.hasRole(userId, 'superAdmin');
    }
    async checkResourceAccess(userId, resource, action, tenantId) {
        try {
            const permission = `${resource}.${action}`;
            const hasPermission = await this.hasPermission(userId, permission, tenantId);
            if (hasPermission) {
                return { authorized: true };
            }
            else {
                return {
                    authorized: false,
                    reason: `User does not have permission ${permission}`,
                };
            }
        }
        catch (error) {
            this.logger.error(`Error checking resource access for user ${userId}:`, error);
            return {
                authorized: false,
                reason: 'Error checking resource access',
            };
        }
    }
    clearUserCache(userId, tenantId) {
        const permissionCacheKey = `${userId}_${tenantId || 'public'}`;
        const roleCacheKey = `${userId}_roles_${tenantId || 'public'}`;
        this.permissionCache.delete(permissionCacheKey);
        this.roleCache.delete(roleCacheKey);
        this.logger.log(`Cleared cache for user ${userId}`);
    }
    clearAllCache() {
        this.permissionCache.clear();
        this.roleCache.clear();
        this.logger.log('Cleared all authorization cache');
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = AuthorizationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map