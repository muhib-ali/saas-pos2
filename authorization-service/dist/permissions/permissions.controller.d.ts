import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { PermissionFilterDto } from "./dto/permission-filter.dto";
export declare class PermissionsController {
    private permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/permission.entity").Permission>>;
    update(updatePermissionDto: UpdatePermissionDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/permission.entity").Permission>>;
    getById(id: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/permission.entity").Permission>>;
    getAll(filterDto: PermissionFilterDto): Promise<import("../common/interfaces/api-response.interface").PaginatedApiResponse<import("../entities/permission.entity").Permission>>;
    delete(deletePermissionDto: DeletePermissionDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
