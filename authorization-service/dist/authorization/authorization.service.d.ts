import { HttpService } from '@nestjs/axios';
import { Role, RolePermission, AuthorizationResult } from './interfaces/permission.interface';
export declare class AuthorizationService {
    private readonly httpService;
    private readonly logger;
    private permissionCache;
    private roleCache;
    constructor(httpService: HttpService);
    hasPermission(userId: string, permission: string, tenantId?: string): Promise<boolean>;
    hasAnyPermission(userId: string, permissions: string[], tenantId?: string): Promise<boolean>;
    hasAllPermissions(userId: string, permissions: string[], tenantId?: string): Promise<boolean>;
    getUserPermissions(userId: string, tenantId?: string): Promise<RolePermission[]>;
    hasRole(userId: string, role: string, tenantId?: string): Promise<boolean>;
    hasAnyRole(userId: string, roles: string[], tenantId?: string): Promise<boolean>;
    hasAllRoles(userId: string, roles: string[], tenantId?: string): Promise<boolean>;
    getUserRoles(userId: string, tenantId?: string): Promise<Role[]>;
    isSuperAdmin(userId: string): Promise<boolean>;
    checkResourceAccess(userId: string, resource: string, action: string, tenantId?: string): Promise<AuthorizationResult>;
    clearUserCache(userId: string, tenantId?: string): void;
    clearAllCache(): void;
}
