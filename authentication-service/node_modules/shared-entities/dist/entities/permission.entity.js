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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const base_audit_columns_entity_1 = require("./base-audit-columns.entity");
const module_entity_1 = require("./module.entity");
let Permission = class Permission extends base_audit_columns_entity_1.BaseAuditColumns {
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], Permission.prototype, "module_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Permission.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Permission.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => module_entity_1.Module),
    (0, typeorm_1.JoinColumn)({ name: "module_id" }),
    __metadata("design:type", module_entity_1.Module)
], Permission.prototype, "module", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)("permissions"),
    (0, typeorm_1.Unique)(["slug", "module_id"])
], Permission);
