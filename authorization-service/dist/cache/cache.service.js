"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
let CacheService = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async get(key) {
        try {
            return await this.cacheManager.get(key);
        }
        catch (error) {
            console.warn(`Cache get error for key ${key}:`, error);
            return undefined;
        }
    }
    async set(key, value, ttl) {
        try {
            await this.cacheManager.set(key, value, ttl);
        }
        catch (error) {
            console.warn(`Cache set error for key ${key}:`, error);
        }
    }
    async del(key) {
        try {
            await this.cacheManager.del(key);
        }
        catch (error) {
            console.warn(`Cache delete error for key ${key}:`, error);
        }
    }
    async reset() {
        try {
            await this.cacheManager.reset();
        }
        catch (error) {
            console.warn("Cache reset error:", error);
        }
    }
    generateTokenKey(token) {
        return `token:${token}`;
    }
    generateUserTokenKey(userId) {
        return `user_tokens:${userId}`;
    }
    async cacheTokenData(token, data, ttlMinutes = 15) {
        const key = this.generateTokenKey(token);
        const ttl = ttlMinutes * 60 * 1000;
        await this.set(key, data, ttl);
    }
    async getTokenData(token) {
        const key = this.generateTokenKey(token);
        return await this.get(key);
    }
    async invalidateToken(token) {
        const key = this.generateTokenKey(token);
        await this.del(key);
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
//# sourceMappingURL=cache.service.js.map