import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean = true;
}
