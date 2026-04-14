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
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }
    async checkPermission(checkPermissionDto, tenantId) {
        return this.authorizationService.checkPermission(checkPermissionDto, tenantId);
    }
    async checkRole(checkRoleDto, tenantId) {
        return this.authorizationService.checkRole(checkRoleDto, tenantId);
    }
    async checkRoles(checkRolesDto, tenantId) {
        return this.authorizationService.checkRoles(checkRolesDto, tenantId);
    }
    async checkAccess(checkAccessDto, tenantId) {
        return this.authorizationService.checkAccess(checkAccessDto, tenantId);
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
    (0, common_1.Post)('check-access'),
    (0, swagger_1.ApiOperation)({ summary: 'Check resource access with action' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_access_dto_1.CheckAccessDto, String]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "checkAccess", null);
exports.AuthorizationController = AuthorizationController = __decorate([
    (0, swagger_1.ApiTags)('authorization'),
    (0, common_1.Controller)('authorization'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [authorization_service_1.AuthorizationService])
], AuthorizationController);
//# sourceMappingURL=authorization.controller.js.map