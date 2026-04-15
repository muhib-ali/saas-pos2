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
const permissions_service_1 = require("./permissions.service");
const shared_entities_1 = require("shared-entities");
const shared_entities_2 = require("shared-entities");
let PermissionsController = class PermissionsController {
    constructor(permissionsService) {
        this.permissionsService = permissionsService;
    }
    async create(createPermissionDto, req) {
        const loggedInUserId = req.user?.id;
        return this.permissionsService.create(createPermissionDto, loggedInUserId);
    }
    async update(updatePermissionDto, req) {
        const loggedInUserId = req.user?.id;
        return this.permissionsService.update(updatePermissionDto, loggedInUserId);
    }
    async getById(id) {
        return this.permissionsService.getById(id);
    }
    async getAll(filterDto) {
        return this.permissionsService.getAll(filterDto);
    }
    async delete(deletePermissionDto) {
        return this.permissionsService.delete(deletePermissionDto);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiOperation)({ summary: "Create new permission" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Permission created successfully",
        type: shared_entities_2.PermissionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad Request - Permission with slug already exists in module or Module not found",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "Permission with this slug already exists in this module",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.CreatePermissionDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.CreatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, swagger_1.ApiOperation)({ summary: "Update permission" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Permission updated successfully",
        type: shared_entities_2.PermissionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Permission not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Permission not found",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad Request - Permission with slug already exists in module or Module not found",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "Permission with this slug already exists in this module",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.UpdatePermissionDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.UpdatePermissionDto, Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Get permission by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Permission retrieved successfully",
        type: shared_entities_2.PermissionResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Permission not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Permission not found",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Permission ID", type: "string" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiOperation)({
        summary: "Get all permissions with pagination and optional module filter",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Permissions retrieved successfully",
        type: shared_entities_2.PermissionsListResponseDto,
    }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        type: Number,
        description: "Page number",
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        type: Number,
        description: "Items per page",
    }),
    (0, swagger_1.ApiQuery)({
        name: "moduleId",
        required: false,
        type: String,
        description: "Module ID to filter permissions",
        example: "8af18c09-a3c0-4aeb-b730-6d489bfb26d6",
    }),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.PermissionFilterDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({ summary: "Delete permission" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Permission deleted successfully",
        schema: {
            example: {
                statusCode: 200,
                status: true,
                message: "Permission deleted successfully",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Permission not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Permission not found",
                heading: "Permission",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: shared_entities_1.DeletePermissionDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shared_entities_1.DeletePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "delete", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)("Permissions"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("permissions"),
    __metadata("design:paramtypes", [permissions_service_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map