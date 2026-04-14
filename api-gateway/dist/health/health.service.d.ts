import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class HealthService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    constructor(httpService: HttpService, configService: ConfigService);
    check(): Promise<{
        status: string;
        services: {
            name: string;
            status: string;
        }[];
        timestamp: string;
    }>;
}
