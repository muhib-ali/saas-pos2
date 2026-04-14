import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { REQUIRE_PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    const tenantId = request.headers['x-tenant-id'];

    if (!userId) {
      throw new ForbiddenException('User ID is required for permission check');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003'}/authorization/check-permission`,
          { userId, permission: requiredPermissions[0] },
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      const result = response.data.data;
      if (!result.hasPermission) {
        throw new ForbiddenException('Insufficient permissions');
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Permission check failed');
    }
  }
}
