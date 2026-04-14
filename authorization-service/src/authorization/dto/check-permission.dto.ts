import { IsString, IsOptional } from 'class-validator';

export class CheckPermissionDto {
  @IsString()
  userId: string;

  @IsString()
  permission: string;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
