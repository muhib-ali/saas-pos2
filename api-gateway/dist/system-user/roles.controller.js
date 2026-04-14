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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const system_user_service_1 = require("./system-user.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const delete_role_dto_1 = require("./dto/delete-role.dto");
const role_permissions_dto_1 = require("./dto/role-permissions.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
let RolesController = class RolesController {
    constructor(systemUserService) {
        this.systemUserService = systemUserService;
    }
    async create(createRoleDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.createRole(createRoleDto, token);
    }
    async update(updateRoleDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.updateRole(updateRoleDto, token);
    }
    async getById(id, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.getRoleById(id, token);
    }
    async getAll(paginationDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.getAllRoles(paginationDto, token);
    }
    async delete(deleteRoleDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.deleteRole(deleteRoleDto, token);
    }
    async getAllPermissionsByRoleId(roleId, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.getAllPermissionsByRoleId(roleId, token);
    }
    async updatePermissionsAccessByRoleId(updateDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.updatePermissionsAccessByRoleId(updateDto, token);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new role' }),
    (0, swagger_1.ApiBody)({ type: create_role_dto_1.CreateRoleDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update existing role' }),
    (0, swagger_1.ApiBody)({ type: update_role_dto_1.UpdateRoleDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_role_dto_1.UpdateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get role by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Role UUID', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('getAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all roles with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10, max: 100)', example: 10 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete role' }),
    (0, swagger_1.ApiBody)({ type: delete_role_dto_1.DeleteRoleDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_role_dto_1.DeleteRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('getAllPermissionsByRoleId/:roleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions by role ID' }),
    (0, swagger_1.ApiParam)({ name: 'roleId', description: 'Role ID', type: 'string' }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAllPermissionsByRoleId", null);
__decorate([
    (0, common_1.Put)('updatePermissionsAccessByRoleId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update permissions access by role ID' }),
    (0, swagger_1.ApiBody)({ type: role_permissions_dto_1.UpdateRolePermissionsDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_permissions_dto_1.UpdateRolePermissionsDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updatePermissionsAccessByRoleId", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)('roles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [system_user_service_1.SystemUserService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map