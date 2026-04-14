import { Repository } from "typeorm";
import { Module } from "../entities/module.entity";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { DeleteModuleDto } from "./dto/delete-module.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { ApiResponse, PaginatedApiResponse } from "../common/interfaces/api-response.interface";
export declare class ModulesService {
    private moduleRepository;
    constructor(moduleRepository: Repository<Module>);
    create(createModuleDto: CreateModuleDto): Promise<ApiResponse<Module>>;
    update(updateModuleDto: UpdateModuleDto): Promise<ApiResponse<Module>>;
    getById(id: string): Promise<ApiResponse<Module>>;
    getAll(paginationDto: PaginationDto): Promise<PaginatedApiResponse<Module>>;
    delete(deleteModuleDto: DeleteModuleDto): Promise<ApiResponse<null>>;
}
