import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Country } from "./country.entity";

@Entity("cities")
@Unique(["slug"])
export class City extends BaseAuditColumns {
  @Column({ type: "uuid" })
  country_id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  slug: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: "country_id" })
  country: Country;
}
