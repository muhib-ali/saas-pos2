import { IsString, IsOptional, IsArray } from 'class-validator';

export class CheckRoleDto {
  @IsString()
  userId: string;

  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class CheckRolesDto {
  @IsString()
  userId: string;

  @IsArray()
  @IsString({ each: true })
  roles: string[];

  @IsOptional()
  @IsString()
  tenantId?: string;
}
