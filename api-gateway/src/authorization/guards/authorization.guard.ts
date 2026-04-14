import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { AUTHORIZE_KEY, AuthorizeMetadata } from '../decorators/authorize.decorator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly httpService: HttpService,
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
    const userId = request.headers['x-user-id'];
    const tenantId = request.headers['x-tenant-id'];

    if (!userId) {
      throw new ForbiddenException('User ID is required for authorization check');
    }

    const { resource, action } = authorizeMetadata;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${process.env.AUTHORIZATION_SERVICE_URL || 'http://localhost:3003'}/authorization/check-access`,
          { userId, resource, action },
          {
            headers: tenantId ? { 'x-tenant-id': tenantId } : {},
          },
        ),
      );

      const result = response.data.data;
      if (!result.authorized) {
        throw new ForbiddenException(
          result.reason || `You are not authorized to ${action} ${resource}`,
        );
      }

      return true;
    } catch (error) {
      throw new ForbiddenException('Authorization check failed');
    }
  }
}
