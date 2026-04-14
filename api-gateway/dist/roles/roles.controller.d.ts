import { HttpService } from '@nestjs/axios';
export declare class RolesController {
    private readonly httpService;
    constructor(httpService: HttpService);
    createRole(createRoleDto: any, tenantId?: string): Promise<any>;
    updateRole(updateRoleDto: any, tenantId?: string): Promise<any>;
    getRoleById(id: string, tenantId?: string): Promise<any>;
    getAllRoles(query: any, tenantId?: string): Promise<any>;
    deleteRole(deleteRoleDto: any, tenantId?: string): Promise<any>;
}
