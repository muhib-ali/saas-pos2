import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { DatabaseConfig } from './database.config';

@Module({
  providers: [
    AppConfigService,
    {
      provide: 'DATABASE_CONFIG',
      useValue: DatabaseConfig,
    },
  ],
  exports: [AppConfigService, 'DATABASE_CONFIG'],
})
export class ConfigModule {}
