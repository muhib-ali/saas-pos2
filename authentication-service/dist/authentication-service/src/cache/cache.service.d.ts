import { Cache } from "cache-manager";
export declare class CacheService {
    private cacheManager;
    private readonly logger;
    constructor(cacheManager: Cache);
    get<T>(key: string): Promise<T | undefined>;
    set<T>(key: string, value: T, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
    generateTokenKey(token: string): string;
    generateUserTokenKey(userId: string): string;
    cacheTokenData(token: string, data: any, ttlMinutes?: number): Promise<void>;
    getTokenData(token: string): Promise<any>;
    invalidateToken(token: string): Promise<void>;
}
