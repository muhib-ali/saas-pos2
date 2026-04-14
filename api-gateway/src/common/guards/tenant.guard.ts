import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TENANT_REQUIRED_KEY } from '../decorators/tenant-id.decorator';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isTenantRequired = this.reflector.getAllAndOverride<boolean>(TENANT_REQUIRED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If tenant is not explicitly required, allow the request
    if (!isTenantRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new BadRequestException('x-tenant-id header is required');
    }

    // Basic validation - tenant ID should be a non-empty string
    if (typeof tenantId !== 'string' || tenantId.trim() === '') {
      throw new BadRequestException('Invalid x-tenant-id header');
    }

    // Attach tenant ID to request for use in controllers
    request.tenantId = tenantId;

    return true;
  }
}
