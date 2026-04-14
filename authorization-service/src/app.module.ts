import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CacheModule } from "@nestjs/cache-manager";
import { ThrottlerModule, ThrottlerGuard, getOptionsToken, getStorageToken } from "@nestjs/throttler";
import { ConfigModule } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import { APP_FILTER, APP_GUARD, Reflector } from "@nestjs/core";
import { DataSource } from "typeorm";
import { redisStore } from "cache-manager-redis-yet";
import { appDataSourceOptions } from "./config/database.config";
import { RolesModule } from "./roles/roles.module";
import { ModulesModule } from "./modules/modules.module";
import { PermissionsModule } from "./permissions/permissions.module";

import { HealthModule } from "./health/health.module";
import { SharedModule } from "./shared/shared.module";
import { PermissionMiddleware } from "./middleware/permission.middleware";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { Permission } from "./entities/permission.entity";
import { Module as ModuleEntity } from "./entities/module.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { OauthToken } from "./entities/oauth-token.entity";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),

    // Cache with Redis
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          return {
            store: await redisStore({
              socket: {
                host: process.env.REDIS_HOST || "localhost",
                port: parseInt(process.env.REDIS_PORT || "6379", 10),
              },
              password: process.env.REDIS_PASSWORD,
            }),
            ttl: 900000, // 15 minutes in milliseconds
            max: 1000, // Max items in cache
          };
        } catch (error) {
          console.warn("Redis connection failed, falling back to memory cache");
          return {
            ttl: 900000, // 15 minutes in milliseconds
            max: 1000, // Max items in cache
          };
        }
      },
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: "short",
        ttl: 1000, // 1 second
        limit: 3, // 3 requests per second
      },
      {
        name: "medium",
        ttl: 10000, // 10 seconds
        limit: 20, // 20 requests per 10 seconds
      },
      {
        name: "long",
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),

    // Shared global services
    SharedModule,

    // TypeORM entities for middleware
    TypeOrmModule.forFeature([User, Role, Permission, ModuleEntity, RolePermission, OauthToken]),

    // Database
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...appDataSourceOptions,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
    }),

    // App modules
    RolesModule,
    ModulesModule,
    PermissionsModule,
    HealthModule,
  ],
  providers: [
    Reflector,
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // Global rate limiting
    {
      provide: APP_GUARD,
      useFactory: (options: any, storage: any, reflector: Reflector) => {
        return new ThrottlerGuard(options, storage, reflector);
      },
      inject: [getOptionsToken(), getStorageToken(), Reflector],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PermissionMiddleware)
      .exclude("/auth/(.*)", "/health/(.*)", "/api/(.*)") // Exclude auth, health, and swagger routes
      .forRoutes("*"); // Apply to all other routes
  }
}
