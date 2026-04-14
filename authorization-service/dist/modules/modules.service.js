"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const module_entity_1 = require("../entities/module.entity");
const response_helper_1 = require("../common/helpers/response.helper");
let ModulesService = class ModulesService {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    async create(createModuleDto) {
        const { title, slug, description } = createModuleDto;
        const existingModule = await this.moduleRepository.findOne({
            where: { slug },
        });
        if (existingModule) {
            throw new common_1.BadRequestException("Module with this slug already exists");
        }
        const module = this.moduleRepository.create({
            title,
            slug,
            description,
        });
        const savedModule = await this.moduleRepository.save(module);
        return response_helper_1.ResponseHelper.success(savedModule, "Module created successfully", "Module", 201);
    }
    async update(updateModuleDto) {
        const { id, title, slug, description } = updateModuleDto;
        const module = await this.moduleRepository.findOne({ where: { id } });
        if (!module) {
            throw new common_1.NotFoundException("Module not found");
        }
        const existingModule = await this.moduleRepository.findOne({
            where: { slug },
        });
        if (existingModule && existingModule.id !== id) {
            throw new common_1.BadRequestException("Module with this slug already exists");
        }
        const updateData = {
            title,
            slug,
            description,
        };
        await this.moduleRepository.update(id, updateData);
        const updatedModule = await this.moduleRepository.findOne({
            where: { id },
        });
        return response_helper_1.ResponseHelper.success(updatedModule, "Module updated successfully", "Module", 200);
    }
    async getById(id) {
        const module = await this.moduleRepository.findOne({ where: { id } });
        if (!module) {
            throw new common_1.NotFoundException("Module not found");
        }
        return response_helper_1.ResponseHelper.success(module, "Module retrieved successfully", "Module", 200);
    }
    async getAll(paginationDto) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        const [modules, total] = await this.moduleRepository.findAndCount({
            skip,
            take: limit,
            order: { created_at: "DESC" },
        });
        return response_helper_1.ResponseHelper.paginated(modules, page, limit, total, "modules", "Modules retrieved successfully", "Module");
    }
    async delete(deleteModuleDto) {
        const { id } = deleteModuleDto;
        const module = await this.moduleRepository.findOne({ where: { id } });
        if (!module) {
            throw new common_1.NotFoundException("Module not found");
        }
        await this.moduleRepository.remove(module);
        return response_helper_1.ResponseHelper.success(null, "Module deleted successfully", "Module", 200);
    }
};
exports.ModulesService = ModulesService;
exports.ModulesService = ModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ModulesService);
//# sourceMappingURL=modules.service.js.map