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
var ProxyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const axios_2 = require("axios");
const users_routes_1 = require("./routes/users.routes");
const tenants_routes_1 = require("./routes/tenants.routes");
const roles_routes_1 = require("./routes/roles.routes");
const permissions_routes_1 = require("./routes/permissions.routes");
const modules_routes_1 = require("./routes/modules.routes");
let ProxyService = ProxyService_1 = class ProxyService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(ProxyService_1.name);
        this.defaultTimeout = 30000;
        this.services = {
            'authentication-service': this.configService.get('services.authentication'),
            'system-user-service': this.configService.get('services.systemUser'),
            'authorization-service': this.configService.get('services.authorization'),
        };
        this.routes = new Map();
        this.loadRoutes();
    }
    loadRoutes() {
        [...users_routes_1.userRoutes, ...tenants_routes_1.tenantRoutes, ...roles_routes_1.roleRoutes, ...permissions_routes_1.permissionRoutes, ...modules_routes_1.moduleRoutes]
            .forEach(route => {
            const key = `${route.method}:${route.path}`;
            this.routes.set(key, route);
        });
        this.logger.log(`Loaded ${this.routes.size} proxy routes`);
    }
    getRouteConfig(method, path) {
        const key = `${method}:${path}`;
        const route = this.routes.get(key);
        if (!route) {
            throw new common_1.NotFoundException(`Route not found: ${method} ${path}`);
        }
        return route;
    }
    async proxyRequest(routeConfig, request, response, tenantId, userId) {
        const serviceUrl = this.services[routeConfig.targetService];
        if (!serviceUrl) {
            throw new common_1.BadRequestException(`Service not found: ${routeConfig.targetService}`);
        }
        const targetPath = this.replacePathParams(routeConfig.targetPath, request.params);
        const targetUrl = `${serviceUrl}${targetPath}`;
        const headers = {
            'Content-Type': request.headers['content-type'] || 'application/json',
            'User-Agent': request.headers['user-agent'] || 'API-Gateway',
            'X-Forwarded-For': request.ip,
        };
        if (request.headers.authorization) {
            headers['Authorization'] = request.headers.authorization;
        }
        if (tenantId) {
            headers['x-tenant-id'] = tenantId;
        }
        if (userId) {
            headers['x-user-id'] = userId;
        }
        const axiosConfig = {
            method: routeConfig.method,
            url: targetUrl,
            headers,
            timeout: routeConfig.timeout || this.defaultTimeout,
            params: request.query,
            data: request.body,
            validateStatus: () => true,
        };
        try {
            const axiosResponse = await (0, rxjs_1.firstValueFrom)(this.httpService.request(axiosConfig));
            response.status(axiosResponse.status);
            Object.entries(axiosResponse.headers).forEach(([key, value]) => {
                if (this.shouldForwardHeader(key)) {
                    response.setHeader(key, value);
                }
            });
            this.logger.log(`Proxied ${routeConfig.method} ${routeConfig.path} to ${targetUrl}`);
            return axiosResponse.data;
        }
        catch (error) {
            if (error instanceof axios_2.AxiosError) {
                const status = error.response?.status || 500;
                const data = error.response?.data || { message: 'Internal server error' };
                response.status(status);
                this.logger.error(`Proxy error: ${error.message}`);
                return data;
            }
            throw error;
        }
    }
    replacePathParams(path, params) {
        return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => params[key] || `:${key}`);
    }
    shouldForwardHeader(header) {
        const excludedHeaders = ['host', 'connection', 'transfer-encoding'];
        return !excludedHeaders.includes(header.toLowerCase());
    }
    getAllRoutes() {
        return Array.from(this.routes.values());
    }
};
exports.ProxyService = ProxyService;
exports.ProxyService = ProxyService = ProxyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], ProxyService);
//# sourceMappingURL=proxy.service.js.map