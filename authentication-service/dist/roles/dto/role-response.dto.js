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
exports.RolesListResponseDto = exports.RolesListDataDto = exports.RoleResponseDto = exports.PaginationDto = exports.RoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RoleDto {
}
exports.RoleDto = RoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Role UUID",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    __metadata("design:type", String)
], RoleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Role title",
        example: "Platform Admin",
    }),
    __metadata("design:type", String)
], RoleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Role slug (auto-generated)",
        example: "platformAdmin",
    }),
    __metadata("design:type", String)
], RoleDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Role active status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], RoleDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", String)
], RoleDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last update timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", String)
], RoleDto.prototype, "updated_at", void 0);
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Current page number",
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Items per page",
        example: 10,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Total number of items",
        example: 25,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Total number of pages",
        example: 3,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Has next page",
        example: true,
    }),
    __metadata("design:type", Boolean)
], PaginationDto.prototype, "hasNext", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Has previous page",
        example: false,
    }),
    __metadata("design:type", Boolean)
], PaginationDto.prototype, "hasPrev", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Next page number",
        example: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "nextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Previous page number",
        example: null,
        nullable: true,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "prevPage", void 0);
class RoleResponseDto {
}
exports.RoleResponseDto = RoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "HTTP status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], RoleResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], RoleResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Role created successfully",
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module heading",
        example: "Role",
    }),
    __metadata("design:type", String)
], RoleResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RoleDto }),
    __metadata("design:type", RoleDto)
], RoleResponseDto.prototype, "data", void 0);
class RolesListDataDto {
}
exports.RolesListDataDto = RolesListDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [RoleDto],
        description: "Array of roles",
    }),
    __metadata("design:type", Array)
], RolesListDataDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PaginationDto }),
    __metadata("design:type", PaginationDto)
], RolesListDataDto.prototype, "pagination", void 0);
class RolesListResponseDto {
}
exports.RolesListResponseDto = RolesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "HTTP status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], RolesListResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], RolesListResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Roles retrieved successfully",
    }),
    __metadata("design:type", String)
], RolesListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module heading",
        example: "Role",
    }),
    __metadata("design:type", String)
], RolesListResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RolesListDataDto }),
    __metadata("design:type", RolesListDataDto)
], RolesListResponseDto.prototype, "data", void 0);
//# sourceMappingURL=role-response.dto.js.map