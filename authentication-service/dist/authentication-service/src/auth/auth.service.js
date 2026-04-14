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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const oauth_token_entity_1 = require("../entities/oauth-token.entity");
const role_permission_entity_1 = require("../entities/role-permission.entity");
const permission_entity_1 = require("../entities/permission.entity");
const module_entity_1 = require("../entities/module.entity");
const role_entity_1 = require("../entities/role.entity");
const cache_service_1 = require("../cache/cache.service");
const config_service_1 = require("../config/config.service");
const response_helper_1 = require("../common/helpers/response.helper");
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, tokenRepository, rolePermissionRepository, permissionRepository, moduleRepository, roleRepository, jwtService, cacheService, configService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionRepository = permissionRepository;
        this.moduleRepository = moduleRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.cacheService = cacheService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async getModulesWithPermissions(roleId) {
        const allPermissions = await this.permissionRepository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.module", "m")
            .orderBy("m.title", "ASC")
            .addOrderBy("p.title", "ASC")
            .getMany();
        const rolePermissions = await this.rolePermissionRepository
            .createQueryBuilder("rp")
            .where("rp.role_id = :roleId", { roleId })
            .getMany();
        const rolePermissionMap = new Map();
        rolePermissions.forEach((rp) => {
            rolePermissionMap.set(rp.permission_id, rp);
        });
        const moduleMap = new Map();
        allPermissions.forEach((permission) => {
            const moduleSlug = permission.module.slug;
            const moduleName = permission.module.title;
            if (!moduleMap.has(moduleSlug)) {
                moduleMap.set(moduleSlug, {
                    module_name: moduleName,
                    module_slug: moduleSlug,
                    permissions: [],
                });
            }
            const rolePermission = rolePermissionMap.get(permission.id);
            const permissionDetail = {
                permission_name: permission.title,
                is_Show_in_menu: permission.slug === "getAll",
                permission_slug: permission.slug,
                route: `${moduleSlug}/${permission.slug}`,
                is_allowed: rolePermission ? rolePermission.is_allowed : false,
            };
            moduleMap.get(moduleSlug).permissions.push(permissionDetail);
        });
        return Array.from(moduleMap.values());
    }
    async getUserPermissions(roleId) {
        const rolePermissions = await this.rolePermissionRepository
            .createQueryBuilder("rp")
            .leftJoin("rp.permission", "p")
            .where("rp.role_id = :roleId AND rp.is_allowed = :isAllowed", {
            roleId,
            isAllowed: true
        })
            .getMany();
        return rolePermissions.map(rp => rp.permission_id);
    }
    async login(loginDto, tenantId) {
        const { email, password } = loginDto;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ["role"],
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const userPermissions = await this.getUserPermissions(user.role.id);
        const payload = {
            sub: user.id,
            email: user.email,
            roles: [user.role.slug],
            permissions: userPermissions,
            tenantId: tenantId || null
        };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtAccessExpires,
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtRefreshExpires,
        });
        const expiresAt = new Date();
        const accessExpiresInMinutes = this.configService.jwtAccessExpiresMinutes;
        expiresAt.setMinutes(expiresAt.getMinutes() + accessExpiresInMinutes);
        const tokenRecord = this.tokenRepository.create({
            userId: user.id,
            name: `${user.name} - ${new Date().toISOString()}`,
            token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            revoked: false,
        });
        await this.tokenRepository.save(tokenRecord);
        const tokenData = {
            userId: user.id,
            expires_at: expiresAt,
            revoked: false,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
        await this.cacheService.cacheTokenData(accessToken, tokenData, accessExpiresInMinutes);
        const modulesWithPermisssions = await this.getModulesWithPermissions(user.role.id);
        this.logger.log(`User logged in successfully: ${user.email}`);
        return response_helper_1.ResponseHelper.success({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: accessToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
            modulesWithPermisssions,
        }, "Login successful", "Authentication");
    }
    async refresh(refreshDto) {
        const { refresh_token } = refreshDto;
        try {
            const payload = this.jwtService.verify(refresh_token);
            const tokenRecord = await this.tokenRepository.findOne({
                where: {
                    refresh_token,
                    userId: payload.sub,
                    revoked: false,
                },
                relations: ["user"],
            });
            if (!tokenRecord) {
                throw new common_1.UnauthorizedException("Invalid refresh token");
            }
            if (new Date() > tokenRecord.expires_at) {
                throw new common_1.UnauthorizedException("Token expired");
            }
            const newPayload = { sub: payload.sub, email: payload.email };
            const newAccessToken = this.jwtService.sign(newPayload, {
                expiresIn: this.configService.jwtAccessExpires,
            });
            const newExpiresAt = new Date();
            const accessExpiresInMinutes = this.configService.jwtAccessExpiresMinutes;
            newExpiresAt.setMinutes(newExpiresAt.getMinutes() + accessExpiresInMinutes);
            tokenRecord.token = newAccessToken;
            tokenRecord.expires_at = newExpiresAt;
            await this.tokenRepository.save(tokenRecord);
            const tokenData = {
                userId: tokenRecord.userId,
                expires_at: newExpiresAt,
                revoked: false,
                user: tokenRecord.user,
            };
            await this.cacheService.cacheTokenData(newAccessToken, tokenData, accessExpiresInMinutes);
            this.logger.log(`Token refreshed for user: ${tokenRecord.user.email}`);
            return response_helper_1.ResponseHelper.success({
                token: newAccessToken,
                expires_at: newExpiresAt,
            }, "Token refreshed successfully", "Authentication");
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid refresh token");
        }
    }
    async logout(token) {
        const tokenRecord = await this.tokenRepository.findOne({
            where: { token },
            relations: ["user"],
        });
        if (tokenRecord) {
            await this.tokenRepository.remove(tokenRecord);
            await this.cacheService.invalidateToken(token);
            this.logger.log(`User logged out: ${tokenRecord.user?.email || "unknown"}`);
        }
        return response_helper_1.ResponseHelper.success(null, "Logged out successfully", "Authentication");
    }
    async validateToken(token, userId) {
        try {
            const cachedData = await this.cacheService.getTokenData(token);
            if (cachedData) {
                if (cachedData.userId === userId &&
                    !cachedData.revoked &&
                    new Date() < new Date(cachedData.expires_at)) {
                    return cachedData.user;
                }
                else {
                    await this.cacheService.invalidateToken(token);
                }
            }
            const tokenRecord = await this.tokenRepository.findOne({
                where: {
                    token,
                    userId,
                    revoked: false,
                },
                select: ["id", "expires_at", "revoked", "userId"],
                relations: ["user", "user.role"],
            });
            if (!tokenRecord) {
                return null;
            }
            if (new Date() > tokenRecord.expires_at) {
                return null;
            }
            const tokenData = {
                userId: tokenRecord.userId,
                expires_at: tokenRecord.expires_at,
                revoked: tokenRecord.revoked,
                user: tokenRecord.user,
            };
            const remainingMinutes = Math.floor((tokenRecord.expires_at.getTime() - new Date().getTime()) / (1000 * 60));
            if (remainingMinutes > 0) {
                await this.cacheService.cacheTokenData(token, tokenData, remainingMinutes);
            }
            return tokenRecord.user;
        }
        catch (error) {
            this.logger.error(`Token validation error: ${error.message}`);
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(oauth_token_entity_1.OauthToken)),
    __param(2, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(3, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(4, (0, typeorm_1.InjectRepository)(module_entity_1.Module)),
    __param(5, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        cache_service_1.CacheService,
        config_service_1.AppConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map