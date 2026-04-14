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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("../../../api-gateway/src/auth/dto/login.dto");
const refresh_dto_1 = require("../../../api-gateway/src/auth/dto/refresh.dto");
const login_response_dto_1 = require("../../../api-gateway/src/auth/dto/login-response.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const public_decorator_1 = require("../common/decorators/public.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto, tenantId) {
        return this.authService.login(loginDto, tenantId);
    }
    async refresh(refreshDto) {
        return this.authService.refresh(refreshDto);
    }
    async logout(req) {
        const token = req.headers.authorization?.split(" ")[1];
        return this.authService.logout(token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("login"),
    (0, swagger_1.ApiOperation)({ summary: "User login" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login successful",
        type: login_response_dto_1.LoginResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: "Invalid credentials",
        schema: {
            example: {
                statusCode: 401,
                status: false,
                message: "Invalid credentials",
                heading: "Authentication",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 429, description: "Too many requests" }),
    (0, swagger_1.ApiHeader)({
        name: "x-tenant-id",
        description: "Tenant ID (optional)",
        required: false,
    }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Headers)("x-tenant-id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)("refresh"),
    (0, swagger_1.ApiOperation)({ summary: "Refresh access token" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Token refreshed successfully",
        schema: {
            example: {
                status: true,
                message: "Token refreshed successfully",
                heading: "Authentication",
                data: {
                    token: "new-jwt-access-token",
                    expires_at: "2024-01-01T00:15:00.000Z",
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Invalid refresh token" }),
    (0, swagger_1.ApiResponse)({ status: 429, description: "Too many requests" }),
    (0, swagger_1.ApiBody)({ type: refresh_dto_1.RefreshDto }),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, swagger_1.ApiOperation)({ summary: "User logout" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Logout successful",
        schema: {
            example: {
                status: true,
                message: "Logged out successfully",
                heading: "Authentication",
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map