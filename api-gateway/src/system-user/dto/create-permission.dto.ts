import { IsString, IsNotEmpty, IsUUID, IsOptional } from "class-validator";

export class CreatePermissionDto {
  @IsUUID()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;
}
