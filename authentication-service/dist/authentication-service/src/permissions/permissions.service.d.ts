import { Repository } from "typeorm";
import { Permission, Module } from 'shared-entities';
import { CreatePermissionDto, UpdatePermissionDto, DeletePermissionDto, PermissionFilterDto } from 'shared-entities';
import { ApiResponse, PaginatedApiResponse } from "../common/interfaces/api-response.interface";
export declare class PermissionsService {
    private permissionRepository;
    private moduleRepository;
    constructor(permissionRepository: Repository<Permission>, moduleRepository: Repository<Module>);
    create(createPermissionDto: CreatePermissionDto, loggedInUserId: string): Promise<ApiResponse<Permission>>;
    update(updatePermissionDto: UpdatePermissionDto, loggedInUserId: string): Promise<ApiResponse<Permission>>;
    getById(id: string): Promise<ApiResponse<Permission>>;
    getAll(filterDto: PermissionFilterDto): Promise<PaginatedApiResponse<Permission>>;
    delete(deletePermissionDto: DeletePermissionDto): Promise<ApiResponse<null>>;
}
