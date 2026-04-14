import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../authorization.service';
import { AUTHORIZE_KEY, AuthorizeMetadata } from '../decorators/authorize.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authorizeMetadata = this.reflector.getAllAndOverride<AuthorizeMetadata>(
      AUTHORIZE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!authorizeMetadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id || request.headers['x-user-id'];
    const tenantId = request.headers['x-tenant-id'];

    if (!userId) {
      throw new ForbiddenException('User ID is required for authorization check');
    }

    const { resource, action } = authorizeMetadata;
    const result = await this.authorizationService.checkResourceAccess(
      userId,
      resource,
      action,
      tenantId,
    );

    if (!result.authorized) {
      throw new ForbiddenException(
        result.reason || `You are not authorized to ${action} ${resource}`,
      );
    }

    return true;
  }
}
