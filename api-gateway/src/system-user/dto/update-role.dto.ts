import { IsString, IsOptional, IsBoolean, IsUUID } from "class-validator";

export class UpdateRoleDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
