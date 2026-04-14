import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import { RolePermission } from "../entities/role-permission.entity";
import { Permission } from "../entities/permission.entity";
import { Module } from "../entities/module.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { UpdateRolePermissionsDto } from "./dto/role-permissions.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
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
