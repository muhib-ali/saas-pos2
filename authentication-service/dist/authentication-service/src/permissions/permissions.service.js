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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shared_entities_1 = require("shared-entities");
const response_helper_1 = require("../common/helpers/response.helper");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository, moduleRepository) {
        this.permissionRepository = permissionRepository;
        this.moduleRepository = moduleRepository;
    }
    async create(createPermissionDto, loggedInUserId) {
        const { module_id, title, slug, description } = createPermissionDto;
        const module = await this.moduleRepository.findOne({
            where: { id: module_id },
        });
        if (!module) {
            throw new common_1.BadRequestException("Module not found");
        }
        const existingPermission = await this.permissionRepository.findOne({
            where: { slug, module_id: module_id },
        });
        if (existingPermission) {
            throw new common_1.BadRequestException("Permission with this slug already exists in this module");
        }
        const permission = this.permissionRepository.create({
            module_id: module_id,
            title,
            slug,
            description,
            created_by: loggedInUserId,
            updated_by: loggedInUserId,
        });
        const savedPermission = await this.permissionRepository.save(permission);
        const permissionWithModule = await this.permissionRepository.findOne({
            where: { id: savedPermission.id },
            relations: ["module"],
        });
        return response_helper_1.ResponseHelper.success(permissionWithModule, "Permission created successfully", "Permission", 201);
    }
    async update(updatePermissionDto, loggedInUserId) {
        const { id, module_id, title, slug, description } = updatePermissionDto;
        const permission = await this.permissionRepository.findOne({
            where: { id },
            relations: ["module"],
        });
        if (!permission) {
            throw new common_1.NotFoundException("Permission not found");
        }
        const module = await this.moduleRepository.findOne({
            where: { id: module_id },
        });
        if (!module) {
            throw new common_1.BadRequestException("Module not found");
        }
        const existingPermission = await this.permissionRepository.findOne({
            where: { slug, module_id: module_id },
        });
        if (existingPermission && existingPermission.id !== id) {
            throw new common_1.BadRequestException("Permission with this slug already exists in this module");
        }
        const updateData = {
            module_id,
            title,
            slug,
            description,
            updated_by: loggedInUserId,
        };
        await this.permissionRepository.update(id, updateData);
        const updatedPermission = await this.permissionRepository.findOne({
            where: { id },
            relations: ["module"],
        });
        return response_helper_1.ResponseHelper.success(updatedPermission, "Permission updated successfully", "Permission", 200);
    }
    async getById(id) {
        const permission = await this.permissionRepository.findOne({
            where: { id },
            relations: ["module"],
        });
        if (!permission) {
            throw new common_1.NotFoundException("Permission not found");
        }
        return response_helper_1.ResponseHelper.success(permission, "Permission retrieved successfully", "Permission", 200);
    }
    async getAll(filterDto) {
        const { page = 1, limit = 10, module_id } = filterDto;
        const skip = (page - 1) * limit;
        const whereConditions = {};
        if (module_id) {
            whereConditions.module_id = module_id;
        }
        const [permissions, total] = await this.permissionRepository.findAndCount({
            where: whereConditions,
            skip,
            take: limit,
            relations: ["module"],
            order: { created_at: "DESC" },
        });
        const message = module_id
            ? "Permissions filtered by module retrieved successfully"
            : "Permissions retrieved successfully";
        return response_helper_1.ResponseHelper.paginated(permissions, page, limit, total, "permissions", message, "Permission");
    }
    async delete(deletePermissionDto) {
        const { id } = deletePermissionDto;
        const permission = await this.permissionRepository.findOne({
            where: { id },
        });
        if (!permission) {
            throw new common_1.NotFoundException("Permission not found");
        }
        await this.permissionRepository.remove(permission);
        return response_helper_1.ResponseHelper.success(null, "Permission deleted successfully", "Permission", 200);
    }
};
exports.PermissionsService = PermissionsService;
exports.PermissionsService = PermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shared_entities_1.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(shared_entities_1.Module)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsService);
//# sourceMappingURL=permissions.service.js.map