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
exports.TenantsController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let TenantsController = class TenantsController {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async createTenant(createTenantDto, tenantId) {
        try {
            const response = await this.httpService.post(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/create`, createTenantDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async updateTenant(updateTenantDto, tenantId) {
        try {
            const response = await this.httpService.put(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/update`, updateTenantDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async getTenantById(id, tenantId) {
        try {
            const response = await this.httpService.get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/getById/${id}`, {
                headers: {},
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async getAllTenants(query, tenantId) {
        try {
            const response = await this.httpService.get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/getAll`, {
                params: query,
                headers: {},
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async deleteTenant(deleteTenantDto, tenantId) {
        try {
            const response = await this.httpService.delete(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/delete`, {
                data: deleteTenantDto,
                headers: {},
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
    async getTenantSchema(schemaName, tenantId) {
        try {
            const response = await this.httpService.get(`${process.env.SYSTEM_USER_SERVICE_URL || 'http://localhost:3000'}/tenants/schema/${schemaName}`, {
                headers: {},
            }).toPromise();
            return response.data;
        }
        catch (error) {
            throw error.response?.data || error;
        }
    }
};
exports.TenantsController = TenantsController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "createTenant", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "updateTenant", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getTenantById", null);
__decorate([
    (0, common_1.Get)('getAll'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getAllTenants", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "deleteTenant", null);
__decorate([
    (0, common_1.Get)('schema/:schemaName'),
    __param(0, (0, common_1.Param)('schemaName')),
    __param(1, (0, common_1.Headers)('x-tenant-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TenantsController.prototype, "getTenantSchema", null);
exports.TenantsController = TenantsController = __decorate([
    (0, common_1.Controller)('tenants'),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TenantsController);
//# sourceMappingURL=tenants.controller.js.map