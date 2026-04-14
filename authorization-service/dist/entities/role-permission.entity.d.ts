import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";
export declare class RolePermission extends BaseAuditColumns {
    role_id: string;
    permission_id: string;
    module_slug: string;
    permission_slug: string;
    is_allowed: boolean;
    role: Role;
    permission: Permission;
}
