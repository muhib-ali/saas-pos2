import { HttpService } from '@nestjs/axios';
export declare class PermissionsController {
    private readonly httpService;
    constructor(httpService: HttpService);
    createPermission(createPermissionDto: any, tenantId?: string): Promise<any>;
    updatePermission(updatePermissionDto: any, tenantId?: string): Promise<any>;
    getPermissionById(id: string, tenantId?: string): Promise<any>;
    getAllPermissions(query: any, tenantId?: string): Promise<any>;
    deletePermission(deletePermissionDto: any, tenantId?: string): Promise<any>;
}
