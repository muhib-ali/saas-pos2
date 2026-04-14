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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
let AuthService = AuthService_1 = class AuthService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.authServiceUrl = this.configService.get('services.authentication');
    }
    async login(loginDto, tenantId) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if (tenantId) {
                headers['x-tenant-id'] = tenantId;
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authServiceUrl}/auth/login`, loginDto, {
                headers,
                timeout: 30000,
            }));
            this.logger.log(`User logged in successfully: ${loginDto.email}`);
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Login failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async refreshToken(refreshDto, tenantId) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if (tenantId) {
                headers['x-tenant-id'] = tenantId;
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authServiceUrl}/auth/refresh`, refreshDto, { headers, timeout: 30000 }));
            this.logger.log('Token refreshed successfully');
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Token refresh failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
    async logout(token, tenantId) {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            if (tenantId) {
                headers['x-tenant-id'] = tenantId;
            }
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.authServiceUrl}/auth/logout`, {}, { headers, timeout: 30000 }));
            this.logger.log('User logged out successfully');
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                this.logger.error(`Logout failed: ${error.message}`);
                throw error.response?.data || error;
            }
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map