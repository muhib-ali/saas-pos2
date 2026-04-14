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
exports.PermissionsListResponseDto = exports.PermissionResponseDto = exports.PermissionDto = exports.ModuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ModuleDto {
}
exports.ModuleDto = ModuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module ID",
        example: "8af18c09-a3c0-4aeb-b730-6d489bfb26d6",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module title",
        example: "Claim Management",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module slug",
        example: "claimManagement",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module description",
        example: "Manage claims and claims processes",
        nullable: true,
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "description", void 0);
class PermissionDto {
}
exports.PermissionDto = PermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission ID",
        example: "9eca588e-e8f9-4346-abea-f57e84d85069",
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module ID",
        example: "8af18c09-a3c0-4aeb-b730-6d489bfb26d6",
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "module_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission title",
        example: "claim Management create",
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission slug",
        example: "create",
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission description",
        example: "Create claim",
        nullable: true,
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module information",
        type: ModuleDto,
    }),
    __metadata("design:type", ModuleDto)
], PermissionDto.prototype, "module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is permission active",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PermissionDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Created by user ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        nullable: true,
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Updated by user ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        nullable: true,
    }),
    __metadata("design:type", String)
], PermissionDto.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", Date)
], PermissionDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last update timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", Date)
], PermissionDto.prototype, "updated_at", void 0);
class PermissionResponseDto {
}
exports.PermissionResponseDto = PermissionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], PermissionResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Operation status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PermissionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Permission retrieved successfully",
    }),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission heading",
        example: "Permission",
    }),
    __metadata("design:type", String)
], PermissionResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission data",
        type: PermissionDto,
    }),
    __metadata("design:type", PermissionDto)
], PermissionResponseDto.prototype, "data", void 0);
class PermissionsListResponseDto {
}
exports.PermissionsListResponseDto = PermissionsListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], PermissionsListResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Operation status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PermissionsListResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Permissions retrieved successfully",
    }),
    __metadata("design:type", String)
], PermissionsListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permission heading",
        example: "Permission",
    }),
    __metadata("design:type", String)
], PermissionsListResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Permissions data with pagination",
        type: "object",
        properties: {
            permissions: {
                type: "array",
                items: { $ref: "#/components/schemas/PermissionDto" },
            },
            pagination: {
                type: "object",
                properties: {
                    page: { type: "number", example: 1 },
                    limit: { type: "number", example: 10 },
                    total: { type: "number", example: 50 },
                    totalPages: { type: "number", example: 5 },
                    hasNext: { type: "boolean", example: true },
                    hasPrev: { type: "boolean", example: false },
                    nextPage: { type: "number", example: 2, nullable: true },
                    prevPage: { type: "number", example: null, nullable: true },
                },
            },
        },
    }),
    __metadata("design:type", Object)
], PermissionsListResponseDto.prototype, "data", void 0);
//# sourceMappingURL=permission-response.dto.js.map