"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SaaS POS Authorization Service')
        .setDescription('Authorization Service for RBAC in SaaS POS System')
        .setVersion('1.0')
        .addTag('authorization')
        .addTag('permissions')
        .addTag('roles')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = process.env.AUTHORIZATION_SERVICE_PORT || 3003;
    await app.listen(port);
    console.log(`Authorization Service is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map