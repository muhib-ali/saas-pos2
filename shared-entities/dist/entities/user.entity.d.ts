import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Role } from "./role.entity";
export declare class User extends BaseAuditColumns {
    role_id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
