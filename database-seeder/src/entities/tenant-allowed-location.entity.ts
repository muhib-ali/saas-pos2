import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Tenant } from "./tenant.entity";
import { Country } from "./country.entity";
import { City } from "./city.entity";

@Entity("tenant_allowed_locations")
@Unique(["tenant_id", "country_id", "city_id"])
export class TenantAllowedLocation extends BaseAuditColumns {
  @Column({ type: "uuid" })
  tenant_id: string;

  @Column({ type: "uuid" })
  country_id: string;

  @Column({ type: "uuid" })
  city_id: string;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: "tenant_id" })
  tenant: Tenant;

  @ManyToOne(() => Country)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @ManyToOne(() => City)
  @JoinColumn({ name: "city_id" })
  city: City;
}
