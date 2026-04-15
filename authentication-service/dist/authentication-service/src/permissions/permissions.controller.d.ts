import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto, UpdatePermissionDto, DeletePermissionDto, PermissionFilterDto } from "shared-entities";
export declare class PermissionsController {
    private permissionsService;
    constructor(permissionsService: PermissionsService);
    create(createPermissionDto: CreatePermissionDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Permission>>;
    update(updatePermissionDto: UpdatePermissionDto, req: any): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Permission>>;
    getById(id: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("shared-entities").Permission>>;
    getAll(filterDto: PermissionFilterDto): Promise<import("../common/interfaces/api-response.interface").PaginatedApiResponse<import("shared-entities").Permission>>;
    delete(deletePermissionDto: DeletePermissionDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
