import { HttpService } from '@nestjs/axios';
export declare class ModulesController {
    private readonly httpService;
    constructor(httpService: HttpService);
    createModule(createModuleDto: any, tenantId?: string): Promise<any>;
    updateModule(updateModuleDto: any, tenantId?: string): Promise<any>;
    getModuleById(id: string, tenantId?: string): Promise<any>;
    getAllModules(query: any, tenantId?: string): Promise<any>;
    deleteModule(deleteModuleDto: any, tenantId?: string): Promise<any>;
}
