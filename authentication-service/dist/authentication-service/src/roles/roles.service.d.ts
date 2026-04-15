import { Repository } from "typeorm";
import { Role, RolePermission, Permission, Module } from 'shared-entities';
import { CreateRoleDto, UpdateRoleDto, UpdateRolePermissionsDto, PaginationDto } from 'shared-entities';
import { ApiResponse, PaginatedApiResponse } from "../common/interfaces/api-response.interface";
export declare class RolesService {
    private roleRepository;
    private rolePermissionRepository;
    private permissionRepository;
    private moduleRepository;
    constructor(roleRepository: Repository<Role>, rolePermissionRepository: Repository<RolePermission>, permissionRepository: Repository<Permission>, moduleRepository: Repository<Module>);
    private generateSlug;
    create(createRoleDto: CreateRoleDto): Promise<ApiResponse<Role>>;
    update(id: string, updateData: Partial<Omit<UpdateRoleDto, "id">>): Promise<ApiResponse<Role>>;
    getById(id: string): Promise<ApiResponse<Role>>;
    getAll(paginationDto: PaginationDto): Promise<PaginatedApiResponse<Role>>;
    delete(id: string): Promise<ApiResponse<null>>;
    getAllPermissionsByRoleId(roleId: string): Promise<ApiResponse<any>>;
    updatePermissionsAccessByRoleId(updateDto: UpdateRolePermissionsDto, loggedInUserId: string): Promise<ApiResponse<null>>;
}
