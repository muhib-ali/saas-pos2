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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const system_user_service_1 = require("./system-user.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const delete_permission_dto_1 = require("./dto/delete-permission.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
let PermissionsController = class PermissionsController {
    constructor(systemUserService) {
        this.systemUserService = systemUserService;
    }
    async create(createPermissionDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.createPermission(createPermissionDto, token);
    }
    async update(updatePermissionDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.updatePermission(updatePermissionDto, token);
    }
    async getById(id, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.getPermissionById(id, token);
    }
    async getAll(paginationDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.getAllPermissions(paginationDto, token);
    }
    async delete(deletePermissionDto, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.systemUserService.deletePermission(deletePermissionDto, token);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new permission' }),
    (0, swagger_1.ApiBody)({ type: create_permission_dto_1.CreatePermissionDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update permission' }),
    (0, swagger_1.ApiBody)({ type: update_permission_dto_1.UpdatePermissionDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_permission_dto_1.UpdatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get permission by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Permission ID', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('getAll'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete permission' }),
    (0, swagger_1.ApiBody)({ type: delete_permission_dto_1.DeletePermissionDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_permission_dto_1.DeletePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "delete", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)('permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [system_user_service_1.SystemUserService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map