import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const TENANT_REQUIRED_KEY = 'tenantRequired';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-tenant-id'];
  },
);

export const RequireTenant = () => SetMetadata(TENANT_REQUIRED_KEY, true);
