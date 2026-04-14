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
exports.RolePermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("../entities/role-permission.entity");
const role_entity_1 = require("../entities/role.entity");
const permission_entity_1 = require("../entities/permission.entity");
let RolePermissionsService = class RolePermissionsService {
    constructor(rolePermissionRepository, roleRepository, permissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async assignPermissions(dto, tenantId) {
        const { roleId, permissionIds } = dto;
        const role = await this.roleRepository.findOne({ where: { id: roleId } });
        if (!role) {
            throw new common_1.NotFoundException('Role not found');
        }
        await this.rolePermissionRepository.delete({ role_id: roleId });
        const rolePermissions = permissionIds.map(permissionId => this.rolePermissionRepository.create({
            role_id: roleId,
            permission_id: permissionId,
            module_slug: 'temp',
            permission_slug: 'temp',
            is_allowed: true
        }));
        const permissions = await this.permissionRepository.findByIds(permissionIds);
        rolePermissions.forEach((rp, index) => {
            if (permissions[index]) {
                rp.module_slug = permissions[index].module?.slug || '';
                rp.permission_slug = permissions[index].slug;
            }
        });
        const saved = await this.rolePermissionRepository.save(rolePermissions);
        return {
            success: true,
            message: 'Permissions assigned successfully',
            data: saved
        };
    }
    async getRolePermissions(roleId, tenantId) {
        const rolePermissions = await this.rolePermissionRepository.find({
            where: { role_id: roleId },
            relations: ['permission', 'permission.module']
        });
        return {
            success: true,
            data: rolePermissions
        };
    }
    async removePermission(roleId, permissionId) {
        const rolePermission = await this.rolePermissionRepository.findOne({
            where: { role_id: roleId, permission_id: permissionId }
        });
        if (!rolePermission) {
            throw new common_1.NotFoundException('Role permission not found');
        }
        await this.rolePermissionRepository.remove(rolePermission);
        return {
            success: true,
            message: 'Permission removed successfully'
        };
    }
};
exports.RolePermissionsService = RolePermissionsService;
exports.RolePermissionsService = RolePermissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolePermissionsService);
//# sourceMappingURL=role-permissions.service.js.map