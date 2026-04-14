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
var AuthorizationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let AuthorizationService = AuthorizationService_1 = class AuthorizationService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(AuthorizationService_1.name);
        this.authorizationServiceUrl = process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003';
    }
    async checkPermission(checkPermissionDto, tenantId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authorizationServiceUrl}/authorization/check-permission`, checkPermissionDto, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Permission check failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async checkRole(checkRoleDto, tenantId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authorizationServiceUrl}/authorization/check-role`, checkRoleDto, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Role check failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async checkRoles(checkRolesDto, tenantId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authorizationServiceUrl}/authorization/check-roles`, checkRolesDto, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Roles check failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async checkAccess(checkAccessDto, tenantId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authorizationServiceUrl}/authorization/check-access`, checkAccessDto, {
                headers: tenantId ? { 'x-tenant-id': tenantId } : {},
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Access check failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = AuthorizationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthorizationService);
//# sourceMappingURL=authorization.service.js.map