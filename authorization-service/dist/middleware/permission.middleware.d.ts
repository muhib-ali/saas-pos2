import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { RolePermission } from "../entities/role-permission.entity";
import { User } from "../entities/user.entity";
import { OauthToken } from "../entities/oauth-token.entity";
import { CacheService } from "../cache/cache.service";
import { AppConfigService } from "../config/config.service";
export declare class PermissionMiddleware implements NestMiddleware {
    private rolePermissionRepository;
    private userRepository;
    private tokenRepository;
    private cacheService;
    private configService;
    private readonly logger;
    constructor(rolePermissionRepository: Repository<RolePermission>, userRepository: Repository<User>, tokenRepository: Repository<OauthToken>, cacheService: CacheService, configService: AppConfigService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private isExcludedRoute;
    private extractTokenFromHeader;
    private verifyToken;
    private validateTokenInDatabase;
    private getUserWithRole;
    private extractRouteInfo;
    private checkPermissionCached;
}
