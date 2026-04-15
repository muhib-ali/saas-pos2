import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Tenant } from "./tenant.entity";
import { Country } from "./country.entity";
import { City } from "./city.entity";
export declare class TenantAllowedLocation extends BaseAuditColumns {
    tenant_id: string;
    country_id: string;
    city_id: string;
    tenant: Tenant;
    country: Country;
    city: City;
}
