import { Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { Module } from "../entities/module.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { PermissionFilterDto } from "./dto/permission-filter.dto";
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
