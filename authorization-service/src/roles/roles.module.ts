import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { Role } from "../entities/role.entity";
import { RolePermission } from "../entities/role-permission.entity";
import { Permission } from "../entities/permission.entity";
import { Module as ModuleEntity } from "../entities/module.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RolePermission, Permission, ModuleEntity]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
