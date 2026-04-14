import { ModulesService } from "./modules.service";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { DeleteModuleDto } from "./dto/delete-module.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class ModulesController {
    private modulesService;
    constructor(modulesService: ModulesService);
    create(createModuleDto: CreateModuleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/module.entity").Module>>;
    update(updateModuleDto: UpdateModuleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/module.entity").Module>>;
    getById(id: string): Promise<import("../common/interfaces/api-response.interface").ApiResponse<import("../entities/module.entity").Module>>;
    getAll(paginationDto: PaginationDto): Promise<import("../common/interfaces/api-response.interface").PaginatedApiResponse<import("../entities/module.entity").Module>>;
    delete(deleteModuleDto: DeleteModuleDto): Promise<import("../common/interfaces/api-response.interface").ApiResponse<null>>;
}
