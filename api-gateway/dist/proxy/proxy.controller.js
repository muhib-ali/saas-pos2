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
exports.ProxyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const proxy_service_1 = require("./proxy.service");
const tenant_id_decorator_1 = require("../common/decorators/tenant-id.decorator");
let ProxyController = class ProxyController {
    constructor(proxyService) {
        this.proxyService = proxyService;
    }
    async proxy(request, response, headers, tenantId) {
        const method = request.method;
        const path = request.path.replace('/proxy', '');
        const routeConfig = this.proxyService.getRouteConfig(method, path);
        const userId = headers['x-user-id'];
        return this.proxyService.proxyRequest(routeConfig, request, response, tenantId, userId);
    }
};
exports.ProxyController = ProxyController;
__decorate([
    (0, common_1.All)('*'),
    (0, swagger_1.ApiOperation)({ summary: 'Proxy requests to backend services' }),
    (0, swagger_1.ApiHeader)({ name: 'Authorization', description: 'Bearer JWT token', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', description: 'Tenant ID', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'x-user-id', description: 'User ID', required: false }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)()),
    __param(3, (0, tenant_id_decorator_1.TenantId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", Promise)
], ProxyController.prototype, "proxy", null);
exports.ProxyController = ProxyController = __decorate([
    (0, swagger_1.ApiTags)('proxy'),
    (0, common_1.Controller)('proxy'),
    __metadata("design:paramtypes", [proxy_service_1.ProxyService])
], ProxyController);
//# sourceMappingURL=proxy.controller.js.map