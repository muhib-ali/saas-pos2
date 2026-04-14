import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { User } from "../entities/user.entity";
import { OauthToken } from "../entities/oauth-token.entity";
import { RolePermission } from "../entities/role-permission.entity";
import { Permission } from "../entities/permission.entity";
import { Module as ModuleEntity } from "../entities/module.entity";
import { Role } from "../entities/role.entity";
import { CacheModule } from "../cache/cache.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      OauthToken,
      RolePermission,
      Permission,
      ModuleEntity,
      Role,
    ]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || "your-secret-key",
        signOptions: {
          expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
        },
      }),
    }),
    CacheModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
