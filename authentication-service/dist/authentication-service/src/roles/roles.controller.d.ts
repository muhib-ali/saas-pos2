import { RolesService } from "./roles.service";
import { CreateRoleDto, UpdateRoleDto, DeleteRoleDto, UpdateRolePermissionsDto, PaginationDto } from 'shared-entities';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Role>>;
    update(updateRoleDto: UpdateRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Role>>;
    getById(id: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Role>>;
    getAll(paginationDto: PaginationDto): Promise<import("../common/interfaces/api-response.interface").PaginatedApiResponse<import("shared-entities").Role>>;
    delete(deleteRoleDto: DeleteRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
    getAllPermissionsByRoleId(roleId: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<any>>;
    updatePermissionsAccessByRoleId(updateDto: UpdateRolePermissionsDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
