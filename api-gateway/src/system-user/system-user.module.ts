import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';
import { RolesController } from './roles.controller';
import { ModulesController } from './modules.controller';
import { PermissionsController } from './permissions.controller';
import { SystemUserService } from './system-user.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [UsersController, RolesController, ModulesController, PermissionsController],
  providers: [SystemUserService],
  exports: [SystemUserService],
})
export class SystemUserModule {}
