"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
let AppConfigService = class AppConfigService {
    get port() {
        return parseInt(process.env.APP_PORT || "3000", 10);
    }
    get jwtSecret() {
        return process.env.JWT_SECRET || "your-secret-key";
    }
    get jwtAccessExpires() {
        return process.env.JWT_ACCESS_EXPIRES || "15m";
    }
    get jwtAccessExpiresMinutes() {
        return parseInt(process.env.JWT_ACCESS_EXPIRES_MINUTES || "15", 10);
    }
    get jwtRefreshExpires() {
        return process.env.JWT_REFRESH_EXPIRES || "7d";
    }
    get redisHost() {
        return process.env.REDIS_HOST || "localhost";
    }
    get redisPort() {
        return parseInt(process.env.REDIS_PORT || "6379", 10);
    }
    get redisPassword() {
        return process.env.REDIS_PASSWORD;
    }
    get dbHost() {
        return process.env.DB_HOST || "localhost";
    }
    get dbPort() {
        return parseInt(process.env.DB_PORT || "5432", 10);
    }
    get dbUsername() {
        return process.env.DB_USERNAME || "postgres";
    }
    get dbPassword() {
        return process.env.DB_PASSWORD || "admin@123";
    }
    get dbName() {
        return process.env.DB_NAME || "saas-pos";
    }
    get dbSsl() {
        return process.env.DB_SSL === "true";
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = __decorate([
    (0, common_1.Injectable)()
], AppConfigService);
//# sourceMappingURL=config.service.js.map