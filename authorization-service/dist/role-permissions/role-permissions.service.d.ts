import { Repository } from 'typeorm';
import { RolePermission } from '../entities/role-permission.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
export declare class RolePermissionsService {
    private rolePermissionRepository;
    private roleRepository;
    private permissionRepository;
    constructor(rolePermissionRepository: Repository<RolePermission>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    assignPermissions(dto: AssignPermissionsDto, tenantId?: string): Promise<{
        success: boolean;
        message: string;
        data: RolePermission[];
    }>;
    getRolePermissions(roleId: string, tenantId?: string): Promise<{
        success: boolean;
        data: RolePermission[];
    }>;
    removePermission(roleId: string, permissionId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
