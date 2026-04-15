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
exports.TenantAllowedLocation = void 0;
const typeorm_1 = require("typeorm");
const base_audit_columns_entity_1 = require("./base-audit-columns.entity");
const tenant_entity_1 = require("./tenant.entity");
const country_entity_1 = require("./country.entity");
const city_entity_1 = require("./city.entity");
let TenantAllowedLocation = class TenantAllowedLocation extends base_audit_columns_entity_1.BaseAuditColumns {
};
exports.TenantAllowedLocation = TenantAllowedLocation;
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], TenantAllowedLocation.prototype, "tenant_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], TenantAllowedLocation.prototype, "country_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], TenantAllowedLocation.prototype, "city_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant),
    (0, typeorm_1.JoinColumn)({ name: "tenant_id" }),
    __metadata("design:type", tenant_entity_1.Tenant)
], TenantAllowedLocation.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country),
    (0, typeorm_1.JoinColumn)({ name: "country_id" }),
    __metadata("design:type", country_entity_1.Country)
], TenantAllowedLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City),
    (0, typeorm_1.JoinColumn)({ name: "city_id" }),
    __metadata("design:type", city_entity_1.City)
], TenantAllowedLocation.prototype, "city", void 0);
exports.TenantAllowedLocation = TenantAllowedLocation = __decorate([
    (0, typeorm_1.Entity)("tenant_allowed_locations"),
    (0, typeorm_1.Unique)(["tenant_id", "country_id", "city_id"])
], TenantAllowedLocation);
