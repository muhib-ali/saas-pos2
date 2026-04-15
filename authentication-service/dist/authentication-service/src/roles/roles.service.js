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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const shared_entities_1 = require("shared-entities");
const response_helper_1 = require("../common/helpers/response.helper");
let RolesService = class RolesService {
    constructor(roleRepository, rolePermissionRepository, permissionRepository, moduleRepository) {
        this.roleRepository = roleRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
        this.moduleRepository = moduleRepository;
    }
    generateSlug(title) {
        return title
            .trim()
            .replace(/[^\w\s]/gi, "")
            .split(" ")
            .map((word, index) => {
            if (index === 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
            .join("");
    }
    async create(createRoleDto) {
        const { title } = createRoleDto;
        const slug = this.generateSlug(title);
        const existingRole = await this.roleRepository.findOne({
            where: { slug },
        });
        if (existingRole) {
            throw new common_1.BadRequestException("Role with this title already exists");
        }
        const role = this.roleRepository.create({
            title,
            slug,
            is_active: true,
        });
        const savedRole = await this.roleRepository.save(role);
        return response_helper_1.ResponseHelper.success(savedRole, "Role created successfully", "Role", 201);
    }
    async update(id, updateData) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        if (updateData.title) {
            const newSlug = this.generateSlug(updateData.title);
            const existingRole = await this.roleRepository.findOne({
                where: { slug: newSlug },
            });
            if (existingRole && existingRole.id !== id) {
                throw new common_1.BadRequestException("Role with this title already exists");
            }
            role.title = updateData.title;
            role.slug = newSlug;
        }
        if (updateData.is_active !== undefined) {
            role.is_active = updateData.is_active;
        }
        const updatedRole = await this.roleRepository.save(role);
        return response_helper_1.ResponseHelper.success(updatedRole, "Role updated successfully", "Role");
    }
    async getById(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        return response_helper_1.ResponseHelper.success(role, "Role retrieved successfully", "Role");
    }
    async getAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [roles, total] = await this.roleRepository.findAndCount({
            order: { created_at: "DESC" },
            skip,
            take: limit,
        });
        return response_helper_1.ResponseHelper.paginated(roles, page, limit, total, "roles", "Roles retrieved successfully", "Role");
    }
    async delete(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        await this.roleRepository.remove(role);
        return response_helper_1.ResponseHelper.success(null, "Role deleted successfully", "Role", 200);
    }
    async getAllPermissionsByRoleId(roleId) {
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        const allPermissions = await this.permissionRepository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.module", "m")
            .orderBy("m.title", "ASC")
            .addOrderBy("p.title", "ASC")
            .getMany();
        const rolePermissions = await this.rolePermissionRepository
            .createQueryBuilder("rp")
            .where("rp.role_id = :roleId", { roleId })
            .getMany();
        const rolePermissionMap = new Map();
        rolePermissions.forEach((rp) => {
            rolePermissionMap.set(rp.permission_id, rp);
        });
        const moduleMap = new Map();
        allPermissions.forEach((permission) => {
            const moduleSlug = permission.module.slug;
            if (!moduleMap.has(moduleSlug)) {
                moduleMap.set(moduleSlug, {
                    module_slug: moduleSlug,
                    permissions: [],
                });
            }
            const rolePermission = rolePermissionMap.get(permission.id);
            const permissionDetail = {
                id: permission.id,
                permission_slug: permission.slug,
                is_allowed: rolePermission ? rolePermission.is_allowed : false,
            };
            moduleMap.get(moduleSlug).permissions.push(permissionDetail);
        });
        const modulesWithPermisssions = Array.from(moduleMap.values());
        return response_helper_1.ResponseHelper.success({ modulesWithPermisssions }, "Role permissions retrieved successfully", "Role", 200);
    }
    async updatePermissionsAccessByRoleId(updateDto, loggedInUserId) {
        const { roleId, modulesWithPermissions } = updateDto;
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) {
            throw new common_1.NotFoundException("Role not found");
        }
        const allPermissionIds = modulesWithPermissions.flatMap((module) => module.permissions.map((p) => p.id));
        const existingPermissions = await this.permissionRepository.findByIds(allPermissionIds);
        if (existingPermissions.length !== allPermissionIds.length) {
            throw new common_1.BadRequestException("One or more permissions not found");
        }
        await this.rolePermissionRepository.manager.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.delete(shared_entities_1.RolePermission, {
                role_id: roleId,
            });
            const newRolePermissions = [];
            for (const module of modulesWithPermissions) {
                for (const permission of module.permissions) {
                    const permissionEntity = existingPermissions.find((p) => p.id === permission.id);
                    if (permissionEntity) {
                        newRolePermissions.push({
                            role_id: roleId,
                            permission_id: permission.id,
                            module_slug: module.moduleSlug,
                            permission_slug: permission.permissionSlug,
                            is_allowed: permission.isAllowed,
                            created_by: loggedInUserId,
                            updated_by: loggedInUserId,
                            is_active: true,
                        });
                    }
                }
            }
            if (newRolePermissions.length > 0) {
                await transactionalEntityManager.save(shared_entities_1.RolePermission, newRolePermissions);
            }
        });
        return response_helper_1.ResponseHelper.success(null, "Role permissions updated successfully", "Role", 200);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(shared_entities_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(shared_entities_1.RolePermission)),
    __param(2, (0, typeorm_1.InjectRepository)(shared_entities_1.Permission)),
    __param(3, (0, typeorm_1.InjectRepository)(shared_entities_1.Module)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map