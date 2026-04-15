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
exports.UpdateRolePermissionsDto = exports.UpdateModulePermissionsDto = exports.UpdateRolePermissionDto = exports.RolePermissionsResponseDto = exports.RoleModuleWithPermissionsDto = exports.RolePermissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
// DTO for single permission in the response
class RolePermissionDto {
}
exports.RolePermissionDto = RolePermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission ID",
        example: "9eca588e-e8f9-4346-abea-f57e84d85069",
    }),
    __metadata("design:type", String)
], RolePermissionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission slug",
        example: "create",
    }),
    __metadata("design:type", String)
], RolePermissionDto.prototype, "permission_slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether the permission is allowed for this role",
        example: true,
    }),
    __metadata("design:type", Boolean)
], RolePermissionDto.prototype, "is_allowed", void 0);
// DTO for module with permissions in the response
class RoleModuleWithPermissionsDto {
}
exports.RoleModuleWithPermissionsDto = RoleModuleWithPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module slug",
        example: "claimManagement",
    }),
    __metadata("design:type", String)
], RoleModuleWithPermissionsDto.prototype, "module_slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of permissions for this module",
        type: [RolePermissionDto],
    }),
    __metadata("design:type", Array)
], RoleModuleWithPermissionsDto.prototype, "permissions", void 0);
// DTO for the main response
class RolePermissionsResponseDto {
}
exports.RolePermissionsResponseDto = RolePermissionsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], RolePermissionsResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Operation status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], RolePermissionsResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Role permissions retrieved successfully",
    }),
    __metadata("design:type", String)
], RolePermissionsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response heading",
        example: "Role",
    }),
    __metadata("design:type", String)
], RolePermissionsResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Modules with permissions data",
        type: "object",
        properties: {
            modulesWithPermisssions: {
                type: "array",
                items: { $ref: "#/components/schemas/RoleModuleWithPermissionsDto" },
            },
        },
    }),
    __metadata("design:type", Object)
], RolePermissionsResponseDto.prototype, "data", void 0);
// DTOs for update endpoint
class UpdateRolePermissionDto {
}
exports.UpdateRolePermissionDto = UpdateRolePermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission ID",
        example: "9eca588e-e8f9-4346-abea-f57e84d85069",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateRolePermissionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission slug",
        example: "create",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateRolePermissionDto.prototype, "permissionSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Whether the permission is allowed for this role",
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRolePermissionDto.prototype, "isAllowed", void 0);
class UpdateModulePermissionsDto {
}
exports.UpdateModulePermissionsDto = UpdateModulePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module slug",
        example: "roles",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateModulePermissionsDto.prototype, "moduleSlug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "List of permissions for this module",
        type: [UpdateRolePermissionDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateRolePermissionDto),
    __metadata("design:type", Array)
], UpdateModulePermissionsDto.prototype, "permissions", void 0);
class UpdateRolePermissionsDto {
}
exports.UpdateRolePermissionsDto = UpdateRolePermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Role ID",
        example: "8af18c09-a3c0-4aeb-b730-6d489bfb26d0",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateRolePermissionsDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Modules with permissions to update",
        type: [UpdateModulePermissionsDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateModulePermissionsDto),
    __metadata("design:type", Array)
], UpdateRolePermissionsDto.prototype, "modulesWithPermissions", void 0);
