import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { ServicesConfig } from './services.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AppConfig, ServicesConfig],
    }),
  ],
  exports: [ConfigModule],
})
export class AppConfigModule {}
