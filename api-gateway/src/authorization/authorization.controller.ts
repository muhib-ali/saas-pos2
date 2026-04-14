import { Controller, Post, Get, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AuthorizationService } from './authorization.service';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('authorization')
@Controller('authorization')
@UseGuards(JwtAuthGuard)
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('check-permission')
  @ApiOperation({ summary: 'Check if user has specific permission' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkPermission(
    @Body() checkPermissionDto: CheckPermissionDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return this.authorizationService.checkPermission(checkPermissionDto, tenantId);
  }

  @Post('check-role')
  @ApiOperation({ summary: 'Check if user has specific role' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkRole(
    @Body() checkRoleDto: CheckRoleDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return this.authorizationService.checkRole(checkRoleDto, tenantId);
  }

  @Post('check-roles')
  @ApiOperation({ summary: 'Check if user has any of specified roles' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkRoles(
    @Body() checkRolesDto: CheckRolesDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return this.authorizationService.checkRoles(checkRolesDto, tenantId);
  }

  @Post('check-access')
  @ApiOperation({ summary: 'Check resource access with action' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkAccess(
    @Body() checkAccessDto: CheckAccessDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    return this.authorizationService.checkAccess(checkAccessDto, tenantId);
  }
}
