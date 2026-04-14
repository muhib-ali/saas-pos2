import { Controller, All, Req, Res, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ProxyService } from './proxy.service';
import { TenantId } from '../common/decorators/tenant-id.decorator';

@ApiTags('proxy')
@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  @ApiOperation({ summary: 'Proxy requests to backend services' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer JWT token', required: true })
  @ApiHeader({ name: 'x-tenant-id', description: 'Tenant ID', required: false })
  @ApiHeader({ name: 'x-user-id', description: 'User ID', required: false })
  async proxy(@Req() request: Request, @Res() response: Response, @Headers() headers: any, @TenantId() tenantId?: string) {
    const method = request.method as any;
    const path = request.path.replace('/proxy', '');

    const routeConfig = this.proxyService.getRouteConfig(method, path);

    const userId = headers['x-user-id'];

    return this.proxyService.proxyRequest(
      routeConfig,
      request,
      response,
      tenantId,
      userId,
    );
  }
}
