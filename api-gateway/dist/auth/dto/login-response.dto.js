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
exports.LoginResponseDto = exports.LoginDataDto = exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const modules_permissions_dto_1 = require("./modules-permissions.dto");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User UUID",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User name",
        example: "Arsalan",
    }),
    __metadata("design:type", String)
], UserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User email",
        example: "arsalan@aarcsol.com",
    }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "User role",
        example: { id: "role-uuid", title: "Platform Admin" },
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "role", void 0);
class LoginDataDto {
}
exports.LoginDataDto = LoginDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: UserDto }),
    __metadata("design:type", UserDto)
], LoginDataDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JWT access token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
    __metadata("design:type", String)
], LoginDataDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "JWT refresh token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
    __metadata("design:type", String)
], LoginDataDto.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Token expiry date",
        example: "2024-01-01T00:15:00.000Z",
    }),
    __metadata("design:type", String)
], LoginDataDto.prototype, "expires_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [modules_permissions_dto_1.ModuleWithPermissionsDto],
        description: "User's modules with permissions based on role",
    }),
    __metadata("design:type", Array)
], LoginDataDto.prototype, "modulesWithPermisssions", void 0);
class LoginResponseDto {
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "HTTP status code",
        example: 200,
    }),
    __metadata("design:type", Number)
], LoginResponseDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], LoginResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response message",
        example: "Login successful",
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Module heading",
        example: "Authentication",
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "heading", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LoginDataDto }),
    __metadata("design:type", LoginDataDto)
], LoginResponseDto.prototype, "data", void 0);
//# sourceMappingURL=login-response.dto.js.map