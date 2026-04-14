import { Module } from '@nestjs/common';
import { HelpersModule } from './helpers/helpers.module';
import { InterfacesModule } from './interfaces/interfaces.module';
import { DtoModule } from './dto/dto.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { RequestIdInterceptor } from './interceptors/request-id.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { TenantMiddleware } from './middlewares/tenant.middleware';

@Module({
  imports: [HelpersModule, InterfacesModule, DtoModule],
  providers: [
    AllExceptionsFilter,
    LoggingInterceptor,
    TimeoutInterceptor,
    RequestIdInterceptor,
    TransformInterceptor,
    TenantMiddleware,
  ],
  exports: [
    HelpersModule,
    InterfacesModule,
    DtoModule,
    AllExceptionsFilter,
    LoggingInterceptor,
    TimeoutInterceptor,
    RequestIdInterceptor,
    TransformInterceptor,
    TenantMiddleware,
  ],
})
export class CommonModule {}
