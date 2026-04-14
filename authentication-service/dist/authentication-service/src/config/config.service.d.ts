export declare class AppConfigService {
    get port(): number;
    get jwtSecret(): string;
    get jwtAccessExpires(): string;
    get jwtAccessExpiresMinutes(): number;
    get jwtRefreshExpires(): string;
    get redisHost(): string;
    get redisPort(): number;
    get redisPassword(): string | undefined;
    get dbHost(): string;
    get dbPort(): number;
    get dbUsername(): string;
    get dbPassword(): string;
    get dbName(): string;
    get dbSsl(): boolean;
}
