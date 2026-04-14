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
exports.ModulesController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let ModulesController = class ModulesController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createModule(createModuleDto, tenantId) {
        if (!tenantId) {
            throw new Error('x-tenant-id header is required for module operations');
        }
        try {
            const response = await this.httpService.post(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/modules/create`, createModuleDto, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-id': tenantId,
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async updateModule(updateModuleDto, tenantId) {
        if (!tenantId) {
            throw new Error('x-tenant-id header is required for module operations');
        }
        try {
            const response = await this.httpService.put(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/modules/update`, updateModuleDto, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant-id': tenantId,
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async getModuleById(id, tenantId) {
        if (!tenantId) {
            throw new Error('x-tenant-id header is required for module operations');
        }
        try {
            const response = await this.httpService.get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/modules/getById/${id}`, {
                headers: {
                    'x-tenant-id': tenantId,
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async getAllModules(query, tenantId) {
        if (!tenantId) {
            throw new Error('x-tenant-id header is required for module operations');
        }
        try {
            const response = await this.httpService.get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/modules/getAll`, {
                params: query,
                headers: {
                    'x-tenant-id': tenantId,
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async deleteModule(deleteModuleDto, tenantId) {
        if (!tenantId) {
            throw new Error('x-tenant-id header is required for module operations');
        }
        try {
            const response = await this.httpService.delete(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/modules/delete`, {
                data: deleteModuleDto,
                headers: {
                    'x-tenant-id': tenantId,
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
};
exports.ModulesController = ModulesController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "createModule", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "updateModule", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "getModuleById", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "getAllModules", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ModulesController.prototype, "deleteModule", null);
exports.ModulesController = ModulesController = __decorate([
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ModulesController);
//# sourceMappingURL=modules.controller.js.map