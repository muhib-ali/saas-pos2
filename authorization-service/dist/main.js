"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger("Bootstrap");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Authorization Service API")
        .setDescription("Authorization microservice for SaaS POS - RBAC management")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
    }, "JWT-auth")
        .addTag("Roles", "Role management endpoints")
        .addTag("Permissions", "Permission management endpoints")
        .addTag("Modules", "Module management endpoints")
        .addTag("Role-Permissions", "Role-Permission assignment endpoints")
        .addTag("Health", "Health check endpoints")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 3003;
    await app.listen(port);
    logger.log(`🚀 Authorization Service is running on: http://localhost:${port}`);
    logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
    logger.log(`🏥 Health check: http://localhost:${port}/health`);
}
bootstrap();
//# sourceMappingURL=main.js.map