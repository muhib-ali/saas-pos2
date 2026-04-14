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
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const modules_service_1 = require("./modules.service");
const create_module_dto_1 = require("./dto/create-module.dto");
const update_module_dto_1 = require("./dto/update-module.dto");
const delete_module_dto_1 = require("./dto/delete-module.dto");
const module_response_dto_1 = require("./dto/module-response.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let ModulesController = class ModulesController {
    constructor(modulesService) {
        this.modulesService = modulesService;
    }
    async create(createModuleDto) {
        return this.modulesService.create(createModuleDto);
    }
    async update(updateModuleDto) {
        return this.modulesService.update(updateModuleDto);
    }
    async getById(id) {
        return this.modulesService.getById(id);
    }
    async getAll(paginationDto) {
        return this.modulesService.getAll(paginationDto);
    }
    async delete(deleteModuleDto) {
        return this.modulesService.delete(deleteModuleDto);
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, common_1.Post)("create"),
    (0, swagger_1.ApiOperation)({ summary: "Create new module" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Module created successfully",
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad Request - Module with slug already exists",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "Module with this slug already exists",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: create_module_dto_1.CreateModuleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update"),
    (0, swagger_1.ApiOperation)({ summary: "Update module" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Module updated successfully",
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Module not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Module not found",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad Request - Module with slug already exists",
        schema: {
            example: {
                statusCode: 400,
                status: false,
                message: "Module with this slug already exists",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: update_module_dto_1.UpdateModuleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("getById/:id"),
    (0, swagger_1.ApiOperation)({ summary: "Get module by ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Module retrieved successfully",
        type: module_response_dto_1.ModuleResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Module not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Module not found",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Module ID", type: "string" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiOperation)({ summary: "Get all modules with pagination" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Modules retrieved successfully",
        type: module_response_dto_1.ModulesListResponseDto,
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
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)("delete"),
    (0, swagger_1.ApiOperation)({ summary: "Delete module" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Module deleted successfully",
        schema: {
            example: {
                statusCode: 200,
                status: true,
                message: "Module deleted successfully",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: "Module not found",
        schema: {
            example: {
                statusCode: 404,
                status: false,
                message: "Module not found",
                heading: "Module",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiBody)({ type: delete_module_dto_1.DeleteModuleDto }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_module_dto_1.DeleteModuleDto]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "delete", null);
exports.ModulesController = ModulesController = __decorate([
    (0, swagger_1.ApiTags)("Modules"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("modules"),
    __metadata("design:paramtypes", [modules_service_1.ModulesService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map