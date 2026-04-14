import { IsString, IsOptional } from 'class-validator';

export class CheckAccessDto {
  @IsString()
  userId: string;

  @IsString()
  resource: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  tenantId?: string;
}
