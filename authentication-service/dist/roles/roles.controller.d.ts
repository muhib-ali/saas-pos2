import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteRoleDto } from "./dto/delete-role.dto";
import { UpdateRolePermissionsDto } from "./dto/role-permissions.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/role.entity").Role>>;
    update(updateRoleDto: UpdateRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/role.entity").Role>>;
    getById(id: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/role.entity").Role>>;
    getAll(paginationDto: PaginationDto): Promise<import("../common/interfaces/api-response.interface").PaginatedApiResponse<import("../entities/role.entity").Role>>;
    delete(deleteRoleDto: DeleteRoleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
    getAllPermissionsByRoleId(roleId: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<any>>;
    updatePermissionsAccessByRoleId(updateDto: UpdateRolePermissionsDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
