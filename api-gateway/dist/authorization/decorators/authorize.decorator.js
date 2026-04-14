"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = exports.AUTHORIZE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.AUTHORIZE_KEY = 'authorize';
const Authorize = (resource, action) => (0, common_1.SetMetadata)(exports.AUTHORIZE_KEY, { resource, action });
exports.Authorize = Authorize;
//# sourceMappingURL=authorize.decorator.js.map