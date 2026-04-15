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
const roles_service_1 = require("./roles.service");
const shared_entities_1 = require("shared-entities");
let RolesController = class RolesController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRoleDto) {
        return this.rolesService.create(createRoleDto);
    }
    async update(updateRoleDto) {
        const { id, ...updateData } = updateRoleDto;
        return this.rolesService.update(id, updateData);
    }
    async getById(id) {
        return this.rolesService.getById(id);
    }
    async getAll(paginationDto) {
        return this.rolesService.getAll(paginationDto);
    }
    async delete(deleteRoleDto) {
        return this.rolesService.delete(deleteRoleDto.id);
    }
    async getAllPermissionsByRoleId(roleId) {
        return this.rolesService.getAllPermissionsByRoleId(roleId);
    }
    async updatePermissionsAccessByRoleId(updateDto, req) {
        const loggedInUserId = req.user?.id;
        return this.rolesService.updatePermissionsAccessByRoleId(updateDto, loggedInUserId);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiOperation)({ summary: "Create new role" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Role created successfully",
        type: shared_entities_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Role with this title already exists",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "Role with this title already exists",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.CreateRoleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, swagger_1.ApiOperation)({ summary: "Update existing role" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Role updated successfully",
        type: shared_entities_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Role not found" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.UpdateRoleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Get role by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Role found",
        type: shared_entities_1.RoleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Role not found" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Role UUID" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiOperation)({ summary: "Get all roles with pagination" }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        type: Number,
        description: "Page number (default: 1)",
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: "Items per page (default: 10, max: 100)",
        example: 10,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Roles retrieved successfully",
        type: shared_entities_1.RolesListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({ summary: "Delete role" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Role deleted successfully",
        schema: {
            example: {
                status: true,
                message: "Role deleted successfully",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Role not found" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.DeleteRoleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.DeleteRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("getAllPermissionsByRoleId/:roleId"),
    (0, swagger_1.ApiOperation)({ summary: "Get all permissions by role ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Role permissions retrieved successfully",
        type: shared_entities_1.RolePermissionsResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Role not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Role not found",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiParam)({ name: "roleId", description: "Role ID", type: "string" }),
    __param(0, (0, common_1.Param)("roleId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getAllPermissionsByRoleId", null);
__decorate([
    (0, common_1.Put)("updatePermissionsAccessByRoleId"),
    (0, swagger_1.ApiOperation)({ summary: "Update permissions access by role ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Role permissions updated successfully",
        schema: {
            example: {
                statusCode: 200,
                status: true,
                message: "Role permissions updated successfully",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Role not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Role not found",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad Request - One or more permissions not found",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "One or more permissions not found",
                heading: "Role",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.UpdateRolePermissionsDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.UpdateRolePermissionsDto, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "updatePermissionsAccessByRoleId", null);
exports.RolesController = RolesController = __decorate([
    (0, swagger_1.ApiTags)("Roles"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("roles"),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
//# sourceMappingURL=roles.controller.js.map