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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authorization_service_1 = require("./authorization.service");
const check_permission_dto_1 = require("./dto/check-permission.dto");
const check_role_dto_1 = require("./dto/check-role.dto");
const check_access_dto_1 = require("./dto/check-access.dto");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }
    async checkPermission(checkPermissionDto, tenantId) {
        const { userId, permission } = checkPermissionDto;
        const hasPermission = await this.authorizationService.hasPermission(userId, permission, tenantId);
        return {
            success: true,
            data: {
                userId,
                permission,
                hasPermission,
            },
        };
    }
    async checkRole(checkRoleDto, tenantId) {
        const { userId, role } = checkRoleDto;
        const hasRole = await this.authorizationService.hasRole(userId, role, tenantId);
        return {
            success: true,
            data: {
                userId,
                role,
                hasRole,
            },
        };
    }
    async checkRoles(checkRolesDto, tenantId) {
        const { userId, roles } = checkRolesDto;
        const hasAnyRole = await this.authorizationService.hasAnyRole(userId, roles, tenantId);
        const hasAllRoles = await this.authorizationService.hasAllRoles(userId, roles, tenantId);
        return {
            success: true,
            data: {
                userId,
                roles,
                hasAnyRole,
                hasAllRoles,
            },
        };
    }
    async getUserPermissions(userId, tenantId) {
        const permissions = await this.authorizationService.getUserPermissions(userId, tenantId);
        return {
            success: true,
            data: permissions,
        };
    }
    async getUserRoles(userId, tenantId) {
        const roles = await this.authorizationService.getUserRoles(userId, tenantId);
        return {
            success: true,
            data: roles,
        };
    }
    async checkAccess(checkAccessDto, tenantId) {
        const { userId, resource, action } = checkAccessDto;
        const result = await this.authorizationService.checkResourceAccess(userId, resource, action, tenantId);
        return {
            success: true,
            data: result,
        };
    }
    async clearUserCache(userId, tenantId) {
        this.authorizationService.clearUserCache(userId, tenantId);
        return {
            success: true,
            message: `Cache cleared for user ${userId}`,
        };
    }
    async clearAllCache() {
        this.authorizationService.clearAllCache();
        return {
            success: true,
            message: 'All authorization cache cleared',
        };
    }
};
exports.AuthorizationController = AuthorizationController;
__decorate([
    (0, common_1.Post)('check-permission'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has specific permission' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_permission_dto_1.CheckPermissionDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "checkPermission", null);
__decorate([
    (0, common_1.Post)('check-role'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has specific role' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_role_dto_1.CheckRoleDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "checkRole", null);
__decorate([
    (0, common_1.Post)('check-roles'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if user has any of specified roles' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_role_dto_1.CheckRolesDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "checkRoles", null);
__decorate([
    (0, common_1.Get)('user-permissions/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions for a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getUserPermissions", null);
__decorate([
    (0, common_1.Get)('user-roles/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles for a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "getUserRoles", null);
__decorate([
    (0, common_1.Post)('check-access'),
    (0, swagger_1.ApiOperation)({ summary: 'Check resource access with action' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_access_dto_1.CheckAccessDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "checkAccess", null);
__decorate([
    (0, common_1.Post)('clear-cache/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear cache for a user' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "clearUserCache", null);
__decorate([
    (0, common_1.Post)('clear-all-cache'),
    (0, swagger_1.ApiOperation)({ summary: 'Clear all authorization cache' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "clearAllCache", null);
exports.AuthorizationController = AuthorizationController = __decorate([
    (0, swagger_1.ApiTags)('authorization'),
    (0, common_1.Controller)('authorization'),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationController);
//# sourceMappingURL=authorization.controller.js.map