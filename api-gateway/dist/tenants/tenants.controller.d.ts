import { HttpService } from '@nestjs/axios';
export declare class TenantsController {
    private readonly httpService;
    constructor(httpService: HttpService);
    createTenant(createTenantDto: any, tenantId?: string): Promise<any>;
    updateTenant(updateTenantDto: any, tenantId?: string): Promise<any>;
    getTenantById(id: string, tenantId?: string): Promise<any>;
    getAllTenants(query: any, tenantId?: string): Promise<any>;
    deleteTenant(deleteTenantDto: any, tenantId?: string): Promise<any>;
    getTenantSchema(schemaName: string, tenantId?: string): Promise<any>;
}
