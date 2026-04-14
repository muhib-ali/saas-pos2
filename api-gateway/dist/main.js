"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const request_id_interceptor_1 = require("./common/interceptors/request-id.interceptor");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
    });
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new request_id_interceptor_1.RequestIdInterceptor(), new logging_interceptor_1.LoggingInterceptor(), new timeout_interceptor_1.TimeoutInterceptor(), new transform_interceptor_1.TransformInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SaaS POS API Gateway')
        .setDescription('Hybrid API Gateway for SaaS POS System')
        .setVersion('2.0')
        .addBearerAuth()
        .addTag('health')
        .addTag('auth')
        .addTag('authorization')
        .addTag('proxy')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.API_GATEWAY_PORT || 3002;
    await app.listen(port);
    console.log(`API Gateway is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map