import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { BaseAuditColumns } from "./base-audit-columns.entity";
import { Domain } from "./domain.entity";

@Entity("tenants")
@Unique(["slug"])
export class Tenant extends BaseAuditColumns {
  @Column({ type: "uuid" })
  domain_id: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  slug: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @ManyToOne(() => Domain)
  @JoinColumn({ name: "domain_id" })
  domain: Domain;
}
