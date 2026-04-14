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
exports.ModuleWithPermissionsDto = exports.PermissionDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PermissionDetailDto {
}
exports.PermissionDetailDto = PermissionDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission name from permissions table",
        example: "Add Role",
    }),
    __metadata("design:type", String)
], PermissionDetailDto.prototype, "permission_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Show in menu - true only if permission_slug is 'getAll'",
        example: false,
    }),
    __metadata("design:type", Boolean)
], PermissionDetailDto.prototype, "is_Show_in_menu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission slug from role_permissions table",
        example: "create",
    }),
    __metadata("design:type", String)
], PermissionDetailDto.prototype, "permission_slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dynamic route created from module_slug/permission_slug",
        example: "roles/create",
    }),
    __metadata("design:type", String)
], PermissionDetailDto.prototype, "route", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is allowed from role_permissions table",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PermissionDetailDto.prototype, "is_allowed", void 0);
class ModuleWithPermissionsDto {
}
exports.ModuleWithPermissionsDto = ModuleWithPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module name from modules table",
        example: "Roles",
    }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "module_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module slug from role_permissions table",
        example: "roles",
    }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "module_slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PermissionDetailDto],
        description: "Array of permissions for this module",
    }),
    __metadata("design:type", Array)
], ModuleWithPermissionsDto.prototype, "permissions", void 0);
//# sourceMappingURL=modules-permissions.dto.js.map