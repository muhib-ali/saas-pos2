import { SystemUserService } from './system-user.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { DeleteModuleDto } from './dto/delete-module.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class ModulesController {
    private readonly systemUserService;
    constructor(systemUserService: SystemUserService);
    create(createModuleDto: CreateModuleDto, req: any): Promise<any>;
    update(updateModuleDto: UpdateModuleDto, req: any): Promise<any>;
    getById(id: string, req: any): Promise<any>;
    getAll(paginationDto: PaginationDto, req: any): Promise<any>;
    delete(deleteModuleDto: DeleteModuleDto, req: any): Promise<any>;
}
