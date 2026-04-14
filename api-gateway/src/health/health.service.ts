import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async check() {
    const services = [
      {
        name: 'authentication-service',
        url: this.configService.get<string>('services.authentication'),
      },
      {
        name: 'system-user-service',
        url: this.configService.get<string>('services.systemUser'),
      },
      {
        name: 'authorization-service',
        url: this.configService.get<string>('services.authorization'),
      },
    ];

    const results = await Promise.allSettled(
      services.map(async (service) => {
        try {
          await firstValueFrom(
            this.httpService.get(`${service.url}/health`, { timeout: 5000 }),
          );
          return { name: service.name, status: 'up' };
        } catch {
          return { name: service.name, status: 'down' };
        }
      }),
    );

    const healthStatus = results.every((r) => 
      r.status === 'fulfilled' && r.value.status === 'up'
    );

    return {
      status: healthStatus ? 'healthy' : 'unhealthy',
      services: results.map((r) => 
        r.status === 'fulfilled' ? r.value : { name: 'unknown', status: 'error' }
      ),
      timestamp: new Date().toISOString(),
    };
  }
}
