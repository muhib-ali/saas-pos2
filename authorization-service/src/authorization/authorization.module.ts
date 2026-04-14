import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
  imports: [HttpModule],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationService,
    PermissionsGuard,
    RolesGuard,
    AuthorizationGuard,
  ],
  exports: [
    AuthorizationService,
    PermissionsGuard,
    RolesGuard,
    AuthorizationGuard,
  ],
})
export class AuthorizationModule {}
