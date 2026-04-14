import { SystemUserService } from './system-user.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { UpdateRolePermissionsDto } from './dto/role-permissions.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class RolesController {
    private readonly systemUserService;
    constructor(systemUserService: SystemUserService);
    create(createRoleDto: CreateRoleDto, req: any): Promise<any>;
    update(updateRoleDto: UpdateRoleDto, req: any): Promise<any>;
    getById(id: string, req: any): Promise<any>;
    getAll(paginationDto: PaginationDto, req: any): Promise<any>;
    delete(deleteRoleDto: DeleteRoleDto, req: any): Promise<any>;
    getAllPermissionsByRoleId(roleId: string, req: any): Promise<any>;
    updatePermissionsAccessByRoleId(updateDto: UpdateRolePermissionsDto, req: any): Promise<any>;
}
