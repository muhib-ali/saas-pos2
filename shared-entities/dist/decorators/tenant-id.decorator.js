"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireTenant = exports.TenantId = exports.TENANT_REQUIRED_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.TENANT_REQUIRED_KEY = 'tenantRequired';
exports.TenantId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-tenant-id'];
});
const RequireTenant = () => (0, common_1.SetMetadata)(exports.TENANT_REQUIRED_KEY, true);
exports.RequireTenant = RequireTenant;
