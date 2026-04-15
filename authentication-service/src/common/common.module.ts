import { Module } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { TenantMiddleware } from './middlewares/tenant.middleware';

@Module({
  imports: [],
  providers: [
    AllExceptionsFilter,
    LoggingInterceptor,
    TimeoutInterceptor,
    RequestIdInterceptor,
    TransformInterceptor,
    TenantMiddleware,
  ],
  exports: [
    AllExceptionsFilter,
    LoggingInterceptor,
    TimeoutInterceptor,
    RequestIdInterceptor,
    TransformInterceptor,
    TenantMiddleware,
  ],
})
export class CommonModule {}
