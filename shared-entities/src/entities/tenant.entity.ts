// src/entities/tenant.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseAuditColumns } from './base-audit-columns.entity';

@Entity({ name: 'tenants' })
export class Tenant extends BaseAuditColumns {

@Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  schemaName: string; // tenant_1, tenant_2 etc.

  @Column({ nullable: true })
  contactEmail: string;


}