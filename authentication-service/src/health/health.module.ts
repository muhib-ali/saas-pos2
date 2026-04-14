import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { DatabaseConfig } from '../config/database.config';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot(DatabaseConfig.options),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
