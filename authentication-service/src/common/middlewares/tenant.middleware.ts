import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];

    if (tenantId) {
      // Basic validation - tenant ID should be a non-empty string
      if (typeof tenantId !== 'string' || tenantId.trim() === '') {
        throw new BadRequestException('Invalid x-tenant-id header');
      }
      req['tenantId'] = tenantId;
    }

    next();
  }
}
