"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PermissionMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("../entities/role-permission.entity");
const user_entity_1 = require("../entities/user.entity");
const oauth_token_entity_1 = require("../entities/oauth-token.entity");
const cache_service_1 = require("../cache/cache.service");
const config_service_1 = require("../config/config.service");
const jwt = __importStar(require("jsonwebtoken"));
let PermissionMiddleware = PermissionMiddleware_1 = class PermissionMiddleware {
    constructor(rolePermissionRepository, userRepository, tokenRepository, cacheService, configService) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.cacheService = cacheService;
        this.configService = configService;
        this.logger = new common_1.Logger(PermissionMiddleware_1.name);
    }
    async use(req, res, next) {
        try {
            const fullPath = req.originalUrl || req.baseUrl + req.path;
            const url = new URL(fullPath, `http://${req.get("host")}`);
            const pathname = url.pathname;
            const token = this.extractTokenFromHeader(req);
            if (!token) {
                throw new common_1.UnauthorizedException("Authentication token required");
            }
            if (this.isExcludedRoute(pathname)) {
                return next();
            }
            const decoded = this.verifyToken(token);
            const isValidToken = await this.validateTokenInDatabase(token);
            if (!isValidToken) {
                throw new common_1.UnauthorizedException("Token has been revoked or expired");
            }
            const user = await this.getUserWithRole(decoded.sub);
            if (!user) {
                throw new common_1.UnauthorizedException("User not found");
            }
            const { moduleSlug, permissionSlug } = this.extractRouteInfo(pathname);
            if (!moduleSlug || !permissionSlug) {
                throw new common_1.ForbiddenException("Invalid route format");
            }
            const hasPermission = await this.checkPermissionCached(user.role.id, moduleSlug, permissionSlug);
            if (!hasPermission) {
                throw new common_1.ForbiddenException(`Access denied: Insufficient permissions for ${moduleSlug}/${permissionSlug}`);
            }
            req.user = user;
            next();
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            this.logger.error(`Permission middleware error: ${error.message}`);
            throw new common_1.ForbiddenException("Access denied");
        }
    }
    isExcludedRoute(pathname) {
        const excludedPaths = ["/auth", "/health", "/api"];
        return excludedPaths.some((path) => pathname.startsWith(path));
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
    verifyToken(token) {
        try {
            return jwt.verify(token, this.configService.jwtSecret);
        }
        catch (error) {
            throw new common_1.UnauthorizedException("Invalid or expired token");
        }
    }
    async validateTokenInDatabase(token) {
        try {
            const tokenRecord = await this.tokenRepository.findOne({
                where: {
                    token,
                    revoked: false,
                },
            });
            if (!tokenRecord) {
                return false;
            }
            if (tokenRecord.expires_at < new Date()) {
                return false;
            }
            return true;
        }
        catch (error) {
            this.logger.error(`Database token validation error: ${error.message}`);
            return false;
        }
    }
    async getUserWithRole(userId) {
        const cacheKey = `user:${userId}`;
        const cachedUser = await this.cacheService.get(cacheKey);
        if (cachedUser && typeof cachedUser === "string") {
            return JSON.parse(cachedUser);
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["role"],
        });
        if (user) {
            await this.cacheService.set(cacheKey, JSON.stringify(user), 300);
        }
        return user;
    }
    extractRouteInfo(path) {
        const pathParts = path.replace(/^\//, "").split("/");
        if (pathParts.length < 2) {
            return { moduleSlug: null, permissionSlug: null };
        }
        const moduleSlug = pathParts[0];
        const permissionSlug = pathParts[1];
        return { moduleSlug, permissionSlug };
    }
    async checkPermissionCached(roleId, moduleSlug, permissionSlug) {
        const cacheKey = `permission:${roleId}:${moduleSlug}:${permissionSlug}`;
        const cachedPermission = await this.cacheService.get(cacheKey);
        if (cachedPermission !== undefined &&
            typeof cachedPermission === "string") {
            return cachedPermission === "true";
        }
        try {
            const permission = await this.rolePermissionRepository.findOne({
                where: {
                    role_id: roleId,
                    module_slug: moduleSlug,
                    permission_slug: permissionSlug,
                    is_allowed: true,
                },
                select: ["id"],
            });
            const hasPermission = !!permission;
            await this.cacheService.set(cacheKey, hasPermission.toString(), 600);
            return hasPermission;
        }
        catch (error) {
            this.logger.error(`Database error checking permission for role ${roleId}, ${moduleSlug}/${permissionSlug}: ${error.message}`);
            return false;
        }
    }
};
exports.PermissionMiddleware = PermissionMiddleware;
exports.PermissionMiddleware = PermissionMiddleware = PermissionMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(oauth_token_entity_1.OauthToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        cache_service_1.CacheService,
        config_service_1.AppConfigService])
], PermissionMiddleware);
//# sourceMappingURL=permission.middleware.js.map