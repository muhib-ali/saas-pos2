"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const helpers_module_1 = require("./helpers/helpers.module");
const interfaces_module_1 = require("./interfaces/interfaces.module");
const dto_module_1 = require("./dto/dto.module");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
const logging_interceptor_1 = require("./interceptors/logging.interceptor");
const timeout_interceptor_1 = require("./interceptors/timeout.interceptor");
const request_id_interceptor_1 = require("./interceptors/request-id.interceptor");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const tenant_middleware_1 = require("./middlewares/tenant.middleware");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [helpers_module_1.HelpersModule, interfaces_module_1.InterfacesModule, dto_module_1.DtoModule],
        providers: [
            all_exceptions_filter_1.AllExceptionsFilter,
            logging_interceptor_1.LoggingInterceptor,
            timeout_interceptor_1.TimeoutInterceptor,
            request_id_interceptor_1.RequestIdInterceptor,
            transform_interceptor_1.TransformInterceptor,
            tenant_middleware_1.TenantMiddleware,
        ],
        exports: [
            helpers_module_1.HelpersModule,
            interfaces_module_1.InterfacesModule,
            dto_module_1.DtoModule,
            all_exceptions_filter_1.AllExceptionsFilter,
            logging_interceptor_1.LoggingInterceptor,
            timeout_interceptor_1.TimeoutInterceptor,
            request_id_interceptor_1.RequestIdInterceptor,
            transform_interceptor_1.TransformInterceptor,
            tenant_middleware_1.TenantMiddleware,
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map