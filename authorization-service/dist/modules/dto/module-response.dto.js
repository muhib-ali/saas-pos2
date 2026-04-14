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
exports.ModulesListResponseDto = exports.ModuleResponseDto = exports.ModuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ModuleDto {
}
exports.ModuleDto = ModuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module title",
        example: "User Management",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module slug",
        example: "userManagement",
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module description",
        example: "Manage user accounts and profiles",
        nullable: true,
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Is module active",
        example: true,
    }),
    __metadata("design:type", Boolean)
], ModuleDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Created by user ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        nullable: true,
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "created_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Updated by user ID",
        example: "123e4567-e89b-12d3-a456-426614174000",
        nullable: true,
    }),
    __metadata("design:type", String)
], ModuleDto.prototype, "updated_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Creation timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", Date)
], ModuleDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Last update timestamp",
        example: "2024-01-01T00:00:00.000Z",
    }),
    __metadata("design:type", Date)
], ModuleDto.prototype, "updated_at", void 0);
class ModuleResponseDto {
}
exports.ModuleResponseDto = ModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Operation status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], ModuleResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Module retrieved successfully",
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module heading",
        example: "Module",
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module data",
        type: ModuleDto,
    }),
    __metadata("design:type", ModuleDto)
], ModuleResponseDto.prototype, "data", void 0);
class ModulesListResponseDto {
}
exports.ModulesListResponseDto = ModulesListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], ModulesListResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Operation status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], ModulesListResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Modules retrieved successfully",
    }),
    __metadata("design:type", String)
], ModulesListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module heading",
        example: "Module",
    }),
    __metadata("design:type", String)
], ModulesListResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Modules data with pagination",
        type: "object",
        properties: {
            modules: {
                type: "array",
                items: { $ref: "#/components/schemas/ModuleDto" },
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
], ModulesListResponseDto.prototype, "data", void 0);
//# sourceMappingURL=module-response.dto.js.map