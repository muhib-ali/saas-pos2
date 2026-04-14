import { HttpService } from '@nestjs/axios';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';
export declare class AuthorizationService {
    private readonly httpService;
    private readonly logger;
    private readonly authorizationServiceUrl;
    constructor(httpService: HttpService);
    checkPermission(checkPermissionDto: CheckPermissionDto, tenantId?: string): Promise<any>;
    checkRole(checkRoleDto: CheckRoleDto, tenantId?: string): Promise<any>;
    checkRoles(checkRolesDto: CheckRolesDto, tenantId?: string): Promise<any>;
    checkAccess(checkAccessDto: CheckAccessDto, tenantId?: string): Promise<any>;
}
