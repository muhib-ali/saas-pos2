"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const authorization_controller_1 = require("./authorization.controller");
const authorization_service_1 = require("./authorization.service");
const authorization_guard_1 = require("./guards/authorization.guard");
const permissions_guard_1 = require("./guards/permissions.guard");
const roles_guard_1 = require("./guards/roles.guard");
let AuthorizationModule = class AuthorizationModule {
};
exports.AuthorizationModule = AuthorizationModule;
exports.AuthorizationModule = AuthorizationModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [authorization_controller_1.AuthorizationController],
        providers: [
            authorization_service_1.AuthorizationService,
            authorization_guard_1.AuthorizationGuard,
            permissions_guard_1.PermissionsGuard,
            roles_guard_1.RolesGuard,
        ],
        exports: [
            authorization_service_1.AuthorizationService,
            authorization_guard_1.AuthorizationGuard,
            permissions_guard_1.PermissionsGuard,
            roles_guard_1.RolesGuard,
        ],
    })
], AuthorizationModule);
//# sourceMappingURL=authorization.module.js.map