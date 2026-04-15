import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Country } from "./country.entity";
export declare class City extends BaseAuditColumns {
    country_id: string;
    title: string;
    slug: string;
    country: Country;
}
