import { SystemUserService } from './system-user.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { DeletePermissionDto } from './dto/delete-permission.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class PermissionsController {
    private readonly systemUserService;
    constructor(systemUserService: SystemUserService);
    create(createPermissionDto: CreatePermissionDto, req: any): Promise<any>;
    update(updatePermissionDto: UpdatePermissionDto, req: any): Promise<any>;
    getById(id: string, req: any): Promise<any>;
    getAll(paginationDto: PaginationDto, req: any): Promise<any>;
    delete(deletePermissionDto: DeletePermissionDto, req: any): Promise<any>;
}
