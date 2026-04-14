import { IsString, IsOptional, IsUUID } from "class-validator";

export class UpdatePermissionDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsUUID()
  moduleId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
