export declare class HealthController {
    check(): {
        status: string;
        timestamp: string;
    };
    checkDatabase(): {
        status: string;
        database: string;
        timestamp: string;
    };
}
