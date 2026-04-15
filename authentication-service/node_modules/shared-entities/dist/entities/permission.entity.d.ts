import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Module } from "./module.entity";
export declare class Permission extends BaseAuditColumns {
    module_id: string;
    title: string;
    slug: string;
    description: string;
    module: Module;
}
