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
exports.RolePermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_permissions_service_1 = require("./role-permissions.service");
const assign_permissions_dto_1 = require("./dto/assign-permissions.dto");
let RolePermissionsController = class RolePermissionsController {
    constructor(rolePermissionsService) {
        this.rolePermissionsService = rolePermissionsService;
    }
    async assignPermissions(dto, tenantId) {
        return this.rolePermissionsService.assignPermissions(dto, tenantId);
    }
    async getRolePermissions(roleId, tenantId) {
        return this.rolePermissionsService.getRolePermissions(roleId, tenantId);
    }
    async removePermission(roleId, permissionId) {
        return this.rolePermissionsService.removePermission(roleId, permissionId);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Post)('assign'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign permissions to a role' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_permissions_dto_1.AssignPermissionsDto, String]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "assignPermissions", null);
__decorate([
    (0, common_1.Get)(':roleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions for a role' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: false }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "getRolePermissions", null);
__decorate([
    (0, common_1.Delete)(':roleId/:permissionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove permission from role' }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Param)('permissionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RolePermissionsController.prototype, "removePermission", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, swagger_1.ApiTags)('role-permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('role-permissions'),
    __metadata("design:paramtypes", [role_permissions_service_1.RolePermissionsService])
], RolePermissionsController);
//# sourceMappingURL=role-permissions.controller.js.map