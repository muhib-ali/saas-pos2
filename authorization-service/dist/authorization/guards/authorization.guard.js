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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const authorization_service_1 = require("../authorization.service");
const authorize_decorator_1 = require("../decorators/authorize.decorator");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(reflector, authorizationService) {
        this.reflector = reflector;
        this.authorizationService = authorizationService;
    }
    async canActivate(context) {
        const authorizeMetadata = this.reflector.getAllAndOverride(authorize_decorator_1.AUTHORIZE_KEY, [context.getHandler(), context.getClass()]);
        if (!authorizeMetadata) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const userId = request.user?.id || request.headers['x-user-id'];
        const tenantId = request.headers['x-tenant-id'];
        if (!userId) {
            throw new common_1.ForbiddenException('User ID is required for authorization check');
        }
        const { resource, action } = authorizeMetadata;
        const result = await this.authorizationService.checkResourceAccess(userId, resource, action, tenantId);
        if (!result.authorized) {
            throw new common_1.ForbiddenException(result.reason || `You are not authorized to ${action} ${resource}`);
        }
        return true;
    }
};
exports.AuthorizationGuard = AuthorizationGuard;
exports.AuthorizationGuard = AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        authorization_service_1.AuthorizationService])
], AuthorizationGuard);
//# sourceMappingURL=authorization.guard.js.map