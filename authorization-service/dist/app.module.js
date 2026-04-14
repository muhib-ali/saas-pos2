"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_2 = require("typeorm");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const database_config_1 = require("./config/database.config");
const roles_module_1 = require("./roles/roles.module");
const modules_module_1 = require("./modules/modules.module");
const permissions_module_1 = require("./permissions/permissions.module");
const health_module_1 = require("./health/health.module");
const shared_module_1 = require("./shared/shared.module");
const permission_middleware_1 = require("./middleware/permission.middleware");
const global_exception_filter_1 = require("./filters/global-exception.filter");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("./entities/role.entity");
const permission_entity_1 = require("./entities/permission.entity");
const module_entity_1 = require("./entities/module.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const oauth_token_entity_1 = require("./entities/oauth-token.entity");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(permission_middleware_1.PermissionMiddleware)
            .exclude("/auth/(.*)", "/health/(.*)", "/api/(.*)")
            .forRoutes("*");
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => {
                    try {
                        return {
                            store: await (0, cache_manager_redis_yet_1.redisStore)({
                                socket: {
                                    host: process.env.REDIS_HOST || "localhost",
                                    port: parseInt(process.env.REDIS_PORT || "6379", 10),
                                },
                                password: process.env.REDIS_PASSWORD,
                            }),
                            ttl: 900000,
                            max: 1000,
                        };
                    }
                    catch (error) {
                        console.warn("Redis connection failed, falling back to memory cache");
                        return {
                            ttl: 900000,
                            max: 1000,
                        };
                    }
                },
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: "short",
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: "medium",
                    ttl: 10000,
                    limit: 20,
                },
                {
                    name: "long",
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            shared_module_1.SharedModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role, permission_entity_1.Permission, module_entity_1.Module, role_permission_entity_1.RolePermission, oauth_token_entity_1.OauthToken]),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => ({
                    ...database_config_1.appDataSourceOptions,
                    autoLoadEntities: true,
                }),
                dataSourceFactory: async (options) => {
                    const dataSource = new typeorm_2.DataSource(options);
                    return dataSource.initialize();
                },
            }),
            roles_module_1.RolesModule,
            modules_module_1.ModulesModule,
            permissions_module_1.PermissionsModule,
            health_module_1.HealthModule,
        ],
        providers: [
            core_1.Reflector,
            {
                provide: core_1.APP_FILTER,
                useClass: global_exception_filter_1.GlobalExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useFactory: (options, storage, reflector) => {
                    return new throttler_1.ThrottlerGuard(options, storage, reflector);
                },
                inject: [(0, throttler_1.getOptionsToken)(), (0, throttler_1.getStorageToken)(), core_1.Reflector],
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map