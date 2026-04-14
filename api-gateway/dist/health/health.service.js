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
var HealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let HealthService = HealthService_1 = class HealthService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(HealthService_1.name);
    }
    async check() {
        const services = [
            {
                name: 'authentication-service',
                url: this.configService.get('services.authentication'),
            },
            {
                name: 'system-user-service',
                url: this.configService.get('services.systemUser'),
            },
            {
                name: 'authorization-service',
                url: this.configService.get('services.authorization'),
            },
        ];
        const results = await Promise.allSettled(services.map(async (service) => {
            try {
                await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${service.url}/health`, { timeout: 5000 }));
                return { name: service.name, status: 'up' };
            }
            catch {
                return { name: service.name, status: 'down' };
            }
        }));
        const healthStatus = results.every((r) => r.status === 'fulfilled' && r.value.status === 'up');
        return {
            status: healthStatus ? 'healthy' : 'unhealthy',
            services: results.map((r) => r.status === 'fulfilled' ? r.value : { name: 'unknown', status: 'error' }),
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = HealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], HealthService);
//# sourceMappingURL=health.service.js.map