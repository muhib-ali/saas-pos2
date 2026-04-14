import { RolePermissionsService } from './role-permissions.service';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    assignPermissions(dto: AssignPermissionsDto, tenantId?: string): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/role-permission.entity").RolePermission[];
    }>;
    getRolePermissions(roleId: string, tenantId?: string): Promise<{
        success: boolean;
        data: import("../entities/role-permission.entity").RolePermission[];
    }>;
    removePermission(roleId: string, permissionId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
