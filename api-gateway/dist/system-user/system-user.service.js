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
var SystemUserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUserService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let SystemUserService = SystemUserService_1 = class SystemUserService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(SystemUserService_1.name);
        this.systemUserServiceUrl = this.configService.get('SYSTEM_USER_SERVICE_URL');
    }
    getHeaders(token) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }
    async createUser(createUserDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.systemUserServiceUrl}/users/create`, createUserDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Create user failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async updateUser(updateUserDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.systemUserServiceUrl}/users/update`, updateUserDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Update user failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getUserById(id, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/users/getById/${id}`, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get user by ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getAllUsers(paginationDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/users/getAll`, {
                headers: this.getHeaders(token),
                params: paginationDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get all users failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async deleteUser(deleteUserDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.systemUserServiceUrl}/users/delete`, {
                headers: this.getHeaders(token),
                data: deleteUserDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Delete user failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async createRole(createRoleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.systemUserServiceUrl}/roles/create`, createRoleDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Create role failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async updateRole(updateRoleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.systemUserServiceUrl}/roles/update`, updateRoleDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Update role failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getRoleById(id, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/roles/getById/${id}`, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get role by ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getAllRoles(paginationDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/roles/getAll`, {
                headers: this.getHeaders(token),
                params: paginationDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get all roles failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async deleteRole(deleteRoleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.systemUserServiceUrl}/roles/delete`, {
                headers: this.getHeaders(token),
                data: deleteRoleDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Delete role failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getAllPermissionsByRoleId(roleId, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/roles/getAllPermissionsByRoleId/${roleId}`, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get all permissions by role ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async updatePermissionsAccessByRoleId(updateDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.systemUserServiceUrl}/roles/updatePermissionsAccessByRoleId`, updateDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Update permissions access by role ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async createModule(createModuleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.systemUserServiceUrl}/modules/create`, createModuleDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Create module failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async updateModule(updateModuleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.systemUserServiceUrl}/modules/update`, updateModuleDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Update module failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getModuleById(id, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/modules/getById/${id}`, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get module by ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getAllModules(paginationDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/modules/getAll`, {
                headers: this.getHeaders(token),
                params: paginationDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get all modules failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async deleteModule(deleteModuleDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.systemUserServiceUrl}/modules/delete`, {
                headers: this.getHeaders(token),
                data: deleteModuleDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Delete module failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async createPermission(createPermissionDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.systemUserServiceUrl}/permissions/create`, createPermissionDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Create permission failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async updatePermission(updatePermissionDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.put(`${this.systemUserServiceUrl}/permissions/update`, updatePermissionDto, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Update permission failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getPermissionById(id, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/permissions/getById/${id}`, {
                headers: this.getHeaders(token),
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get permission by ID failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async getAllPermissions(paginationDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.systemUserServiceUrl}/permissions/getAll`, {
                headers: this.getHeaders(token),
                params: paginationDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Get all permissions failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async deletePermission(deletePermissionDto, token) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.delete(`${this.systemUserServiceUrl}/permissions/delete`, {
                headers: this.getHeaders(token),
                data: deletePermissionDto,
                timeout: 30000,
            }));
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Delete permission failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
};
exports.SystemUserService = SystemUserService;
exports.SystemUserService = SystemUserService = SystemUserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], SystemUserService);
//# sourceMappingURL=system-user.service.js.map