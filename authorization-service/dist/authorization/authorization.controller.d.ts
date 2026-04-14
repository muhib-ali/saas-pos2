import { AuthorizationService } from './authorization.service';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';
export declare class AuthorizationController {
    private readonly authorizationService;
    constructor(authorizationService: AuthorizationService);
    checkPermission(checkPermissionDto: CheckPermissionDto, tenantId?: string): Promise<{
        success: boolean;
        data: {
            userId: string;
            permission: string;
            hasPermission: boolean;
        };
    }>;
    checkRole(checkRoleDto: CheckRoleDto, tenantId?: string): Promise<{
        success: boolean;
        data: {
            userId: string;
            role: string;
            hasRole: boolean;
        };
    }>;
    checkRoles(checkRolesDto: CheckRolesDto, tenantId?: string): Promise<{
        success: boolean;
        data: {
            userId: string;
            roles: string[];
            hasAnyRole: boolean;
            hasAllRoles: boolean;
        };
    }>;
    getUserPermissions(userId: string, tenantId?: string): Promise<{
        success: boolean;
        data: import("./interfaces/permission.interface").RolePermission[];
    }>;
    getUserRoles(userId: string, tenantId?: string): Promise<{
        success: boolean;
        data: import("./interfaces/permission.interface").Role[];
    }>;
    checkAccess(checkAccessDto: CheckAccessDto, tenantId?: string): Promise<{
        success: boolean;
        data: import("./interfaces/permission.interface").AuthorizationResult;
    }>;
    clearUserCache(userId: string, tenantId?: string): Promise<{
        success: boolean;
        message: string;
    }>;
    clearAllCache(): Promise<{
        success: boolean;
        message: string;
    }>;
}
