import { AuthorizationService } from './authorization.service';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';
export declare class AuthorizationController {
    private readonly authorizationService;
    constructor(authorizationService: AuthorizationService);
    checkPermission(checkPermissionDto: CheckPermissionDto, tenantId?: string): Promise<any>;
    checkRole(checkRoleDto: CheckRoleDto, tenantId?: string): Promise<any>;
    checkRoles(checkRolesDto: CheckRolesDto, tenantId?: string): Promise<any>;
    checkAccess(checkAccessDto: CheckAccessDto, tenantId?: string): Promise<any>;
}
