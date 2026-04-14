import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    check(): Promise<{
        status: string;
        services: {
            name: string;
            status: string;
        }[];
        timestamp: string;
    }>;
}
