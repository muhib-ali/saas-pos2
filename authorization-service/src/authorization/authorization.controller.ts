import { Controller, Post, Get, Body, Param, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AuthorizationService } from './authorization.service';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { CheckRoleDto, CheckRolesDto } from './dto/check-role.dto';
import { CheckAccessDto } from './dto/check-access.dto';

@ApiTags('authorization')
@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post('check-permission')
  @ApiOperation({ summary: 'Check if user has specific permission' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkPermission(
    @Body() checkPermissionDto: CheckPermissionDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const { userId, permission } = checkPermissionDto;
    const hasPermission = await this.authorizationService.hasPermission(
      userId,
      permission,
      tenantId
    );

    return {
      success: true,
      data: {
        userId,
        permission,
        hasPermission,
      },
    };
  }

  @Post('check-role')
  @ApiOperation({ summary: 'Check if user has specific role' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkRole(
    @Body() checkRoleDto: CheckRoleDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const { userId, role } = checkRoleDto;
    const hasRole = await this.authorizationService.hasRole(userId, role, tenantId);

    return {
      success: true,
      data: {
        userId,
        role,
        hasRole,
      },
    };
  }

  @Post('check-roles')
  @ApiOperation({ summary: 'Check if user has any of specified roles' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkRoles(
    @Body() checkRolesDto: CheckRolesDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const { userId, roles } = checkRolesDto;
    const hasAnyRole = await this.authorizationService.hasAnyRole(userId, roles, tenantId);
    const hasAllRoles = await this.authorizationService.hasAllRoles(userId, roles, tenantId);

    return {
      success: true,
      data: {
        userId,
        roles,
        hasAnyRole,
        hasAllRoles,
      },
    };
  }

  @Get('user-permissions/:userId')
  @ApiOperation({ summary: 'Get all permissions for a user' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async getUserPermissions(
    @Param('userId') userId: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const permissions = await this.authorizationService.getUserPermissions(userId, tenantId);

    return {
      success: true,
      data: permissions,
    };
  }

  @Get('user-roles/:userId')
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async getUserRoles(
    @Param('userId') userId: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const roles = await this.authorizationService.getUserRoles(userId, tenantId);

    return {
      success: true,
      data: roles,
    };
  }

  @Post('check-access')
  @ApiOperation({ summary: 'Check resource access with action' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async checkAccess(
    @Body() checkAccessDto: CheckAccessDto,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    const { userId, resource, action } = checkAccessDto;
    const result = await this.authorizationService.checkResourceAccess(
      userId,
      resource,
      action,
      tenantId
    );

    return {
      success: true,
      data: result,
    };
  }

  @Post('clear-cache/:userId')
  @ApiOperation({ summary: 'Clear cache for a user' })
  @ApiHeader({ name: 'x-tenant-id', required: false })
  async clearUserCache(
    @Param('userId') userId: string,
    @Headers('x-tenant-id') tenantId?: string
  ) {
    this.authorizationService.clearUserCache(userId, tenantId);

    return {
      success: true,
      message: `Cache cleared for user ${userId}`,
    };
  }

  @Post('clear-all-cache')
  @ApiOperation({ summary: 'Clear all authorization cache' })
  async clearAllCache() {
    this.authorizationService.clearAllCache();

    return {
      success: true,
      message: 'All authorization cache cleared',
    };
  }
}
