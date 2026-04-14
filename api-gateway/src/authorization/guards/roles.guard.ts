import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { REQUIRE_ROLES_KEY } from '../decorators/require-roles.decorator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    const tenantId = request.headers['x-tenant-id'];

    if (!userId) {
      throw new ForbiddenException('User ID is required for role check');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003'}/authorization/check-roles`,
          { userId, roles: requiredRoles },
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      const result = response.data.data;
      if (!result.hasAnyRole) {
        throw new ForbiddenException('Insufficient role privileges');
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Role check failed');
    }
  }
}
