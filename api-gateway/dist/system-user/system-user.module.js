"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemUserModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const users_controller_1 = require("./users.controller");
const roles_controller_1 = require("./roles.controller");
const modules_controller_1 = require("./modules.controller");
const permissions_controller_1 = require("./permissions.controller");
const system_user_service_1 = require("./system-user.service");
let SystemUserModule = class SystemUserModule {
};
exports.SystemUserModule = SystemUserModule;
exports.SystemUserModule = SystemUserModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule],
        controllers: [users_controller_1.UsersController, roles_controller_1.RolesController, modules_controller_1.ModulesController, permissions_controller_1.PermissionsController],
        providers: [system_user_service_1.SystemUserService],
        exports: [system_user_service_1.SystemUserService],
    })
], SystemUserModule);
//# sourceMappingURL=system-user.module.js.map