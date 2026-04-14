import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [HttpModule],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationService,
    AuthorizationGuard,
    PermissionsGuard,
    RolesGuard,
  ],
  exports: [
    AuthorizationService,
    AuthorizationGuard,
    PermissionsGuard,
    RolesGuard,
  ],
})
export class AuthorizationModule {}
