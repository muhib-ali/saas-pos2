import { BaseAuditColumns } from "./base-audit-columns.entity";
import { User } from "./user.entity";
export declare class OauthToken extends BaseAuditColumns {
    userId: string;
    name: string;
    token: string;
    refresh_token: string;
    expires_at: Date;
    revoked: boolean;
    user: User;
}
