import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../authorization.service';
import { REQUIRE_ROLES_KEY } from '../decorators/require-roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      REQUIRE_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || request.headers['x-user-id'];
    const tenantId = request.headers['x-tenant-id'];

    if (!userId) {
      throw new ForbiddenException('User ID is required for role check');
    }

    const hasRole = await this.authorizationService.hasAnyRole(
      userId,
      requiredRoles,
      tenantId,
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `You do not have the required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
